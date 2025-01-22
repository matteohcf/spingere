import { useQuery } from '@tanstack/react-query';
import { appAxios, masterAxios } from '../api/config.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../store/user.ts';

type Props = {
  queryKey: string[];
  queryUrl: string;
  filters?: object;
};

export const useApiUseQuery = ({ queryKey, queryUrl, filters }: Props) => {
  const isLogged = useSelector(userSelectors.isLogged);
  const axiosInstance = isLogged ? appAxios : masterAxios;

  const { data, isLoading, isFetching, isRefetching, error } = useQuery({
    queryKey: [...queryKey, isLogged, filters],
    queryFn: () => axiosInstance.get(queryUrl, { params: filters })
      .then(res => {
        return res.data;
      }),
  });

  return { data, isLoading: isLoading || isFetching || isRefetching, error };
};
