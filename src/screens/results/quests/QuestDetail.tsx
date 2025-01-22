import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '../../../core/navigation/RootNavigator.tsx';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import React, { useState } from 'react';
import { Quest } from '../../../types/quest.ts';
import { useFocusEffect } from '@react-navigation/native';
import { Col, ListEmptyComponent, Row, Separator, Text } from '../../../components';
import { FlatList, StyleSheet } from 'react-native';
import { Theme, User } from '../../../types';
import { getQuestDetail } from '../../../api/quest.ts';
import { spacing, WIDTH_DEVICE } from '../../../constant';
import Image from 'react-native-fast-image';
import { getOdinImage } from '../../../utils/images.ts';
import { QuestProgressBar } from './components/QuestProgressBar.tsx';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.ts';
import { t } from 'i18next';
import { QuestFriendListRow } from './components/QuestFriendListRow.tsx';

type Props = NativeStackScreenProps<SharedStackParamList, 'QuestDetail'>;
type Filters = {};

export const QuestDetail = ({ navigation, route }: Props) => {
  const passedQuest = route.params.quest;
  const styles = useStylesheet(createStyles);
  const [quest, setQuest] = useState<Quest>(passedQuest);
  const image = getOdinImage({
    image: quest?.image,
    format: 'squared',
  });

  const { ...infiniteScrollProps } = useInfiniteScroll<User, Filters>({
    key: `quests/friends/${quest.questLevelId}`,
    url: `quests/friends/${quest.questLevelId}`,
    limit: 10,
    filters: {},
    canRefresh: false,
    staleTime: 0,
  });

  useFocusEffect(
    React.useCallback(() => {
      const fetchQuestDetail = async () => {
        const res = await getQuestDetail(quest._id);
        if (res) {
          setQuest(res);
        }
      };
      fetchQuestDetail();
    }, [quest._id]),
  );

  const onPress = (user: User) => {
    if (!user) return;
    navigation.pop();
    navigation.navigate('UserDetail', { user: user });
  };

  const headerComponent = (
    <Col justifyContent={'center'} alignItems={'center'} gap={12} mt={spacing.lightMargin} mb={16}>
      <Col>
        <Image source={image} style={styles.image} />
      </Col>
      <Col>
        <Text fontWeight={'700'} fontSize={20}>
          {quest?.name} - {quest?.level}
        </Text>
      </Col>
      <Col>
        <Text fontWeight={'400'} fontSize={14}>
          {quest?.description}
        </Text>
      </Col>
      <Row flex={1} mt={8}>
        <QuestProgressBar advancement={quest.advancement} goal={quest.goal} />
      </Row>
      <Separator mv={4} />
      <Col alignSelf={'flex-start'}>
        <Text fontWeight={'600'} fontSize={20}>
          {t('friendsWithQuest')}
        </Text>
      </Col>
    </Col>
  );

  return (
    <FlatList
      style={styles.flatList}
      {...infiniteScrollProps}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior={'automatic'}
      ListHeaderComponent={headerComponent}
      ListEmptyComponent={<ListEmptyComponent text={'noResults.friendsWithQuest'} />}
      renderItem={({ item }) => <QuestFriendListRow user={item} onPress={() => onPress(item)} />}
    />
  );
};

const createStyles = ({ shapes, spacing, colors }: Theme) =>
  StyleSheet.create({
    flatList: {
      backgroundColor: colors.containerBckGround,
      paddingHorizontal: spacing.screenHorizontal,
    },
    image: {
      width: WIDTH_DEVICE / 3,
      height: WIDTH_DEVICE / 3,
      borderRadius: WIDTH_DEVICE / 4 / 3,
    },
  });
