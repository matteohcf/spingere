import { appAxios, masterAxios } from '../api/config';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import _, { isEmpty } from 'lodash';
import { AxiosInstance } from 'axios';
import {ListEmptyComponent, ListFooterComponent, RefreshControl} from '../components';
import { useSelector } from 'react-redux';
import { userSelectors } from '../store/user.ts';
import { useDebounceValue } from './useDebounceValue.ts';

type Params<F> = {
  key: string;
  url: string;
  limit?: number;
  filters?: F;
  axiosInstance?: AxiosInstance;
  enabled?: boolean;
  cacheTime?: number;
  staleTime?: number;
  setTotal?: (total: number) => void;
  debounceMs?: number;
  emptyText?: string;
  canRefresh?: boolean;
};

export const useInfiniteScroll = <T = unknown, F = object>({
  key,
  url,
  limit = 10,
  filters: passedFilters,
  axiosInstance: passedAxios,
  enabled = true,
  cacheTime = 1000 * 60 * 60 * 24, // 24 hours
  staleTime = 300000, // 5 minutes
  setTotal,
  debounceMs,
  emptyText,
  canRefresh = true,
}: Params<F>) => {
  const filters = useDebounceValue(passedFilters, debounceMs);
  const isLogged = useSelector(userSelectors.isLogged);
  const axiosInstance = passedAxios || (isLogged ? appAxios : masterAxios);
  const queryKey = [key, ..._.values<string | string[]>(_.omitBy(filters || {}, isEmpty))].filter(c => Boolean(c) && !isEmpty(c));

  // console.debug({ filters, queryKey });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPaginatedList = useCallback(
    async ({ pageParam = 1 }) => {
      //  const params = { count: true, page: pageParam, limit, ..._.omitBy(filters || {}, isEmpty) };
      const params = { count: true, page: pageParam, limit, ...filters };
      const res = await axiosInstance.get<T[]>(url, { params });
      if (res.headers['odin-count'] !== undefined) {
        setTotal && setTotal(Number(res.headers['odin-count']));
      }
      return {
        data: res.data,
        nextPage: pageParam + 1,
      };
    },
    [limit, filters, axiosInstance, url, setTotal],
  );
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching, isFetchingNextPage, isRefetching, refetch } = useInfiniteQuery(
    queryKey,
    getPaginatedList,
    {
      getNextPageParam: ({ nextPage, data: items }) => {
        if (items?.length < limit) {
          return undefined;
        }
        return nextPage;
      },
      enabled,
      cacheTime,
      staleTime,
    },
  );

  const loadNext = useCallback(() => {
    if (hasNextPage && !isFetching) {
      hasNextPage && !fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const flattenData = useMemo(() => {
    return _.uniqBy(data?.pages.flatMap(page => page.data) || [], '_id');
  }, [data?.pages]);

  const onRefresh = useCallback(() => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      refetch().then(() => setIsRefreshing(false));
    }
  }, [isRefreshing, refetch]);

  return {
    data: flattenData,
    onEndReached: loadNext,
    isLoading: isLoading || isFetching || isRefetching,
    isRefetching,
    isFetchingNextPage,
    refetch,
    // onRefresh,
    ListFooterComponent: ListFooterComponent({ loading: isLoading || isFetchingNextPage }),
    ListEmptyComponent: ListEmptyComponent({ text: emptyText || 'no data' }),
    refreshControl: canRefresh ? RefreshControl({ refreshing: isRefreshing, onRefresh: onRefresh }) : undefined,
    // keyExtractor: (item: any) => item._id,
    showsVerticalScrollIndicator: false,
  };
};
