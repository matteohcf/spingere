import { FlatList, StyleSheet } from 'react-native';
import { ListEmptyComponent } from '../../../components';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.ts';
import { Theme } from '../../../types';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { PeeListRow } from './components/PeeListRow.tsx';
import { Pee } from '../../../types/pee.ts';

type Props = {
  visible: boolean;
  headerComponent?: React.ReactNode;
  navigation: any;
};

type Filters = {};

export const History = ({ visible, headerComponent, navigation }: Props) => {
  const styles = useStylesheet(createStyles);

  const { ...infiniteScrollProps } = useInfiniteScroll<Pee, Filters>({
    key: `pees/history-history`,
    url: 'pees/history',
    limit: 10,
    filters: {
      sort: '-createdAt',
    },
  });

  if (!visible) {
    return null;
  }

  const onPress = (pee: Pee) => {
    navigation.push('PeeDetail', { pee: pee});
  };

  return (
    <>
      <FlatList
        {...infiniteScrollProps}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
        ListHeaderComponent={headerComponent}
        ListEmptyComponent={<ListEmptyComponent text={'noResults.pees'} />}
        renderItem={({ item, index }) => <PeeListRow pee={item} onPress={() => onPress(item)} />}
      />
    </>
  );
};

const createStyles = ({ colors, spacing, shapes }: Theme) => StyleSheet.create({});
