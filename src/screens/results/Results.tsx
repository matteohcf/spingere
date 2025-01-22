import { Col, Container, Row } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../../core/navigation/RootNavigator.tsx';
import React, { useState } from 'react';
import { TabSwitch } from '../../components/layout/TabSwitch.tsx';
import { Quests } from './quests/Quests.tsx';
import { Badges } from './badges/Badges.tsx';
import { InputSearch } from '../../components/ui/InputSearch.tsx';
import { Theme } from '../../types';
import { StyleSheet } from 'react-native';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { spacing } from '../../constant';

type Props = NativeStackScreenProps<RootTabParamList, 'Results'>;

enum Tabs {
  QUESTS = 'quests',
  BADGES = 'badges',
}

const tabs = [Tabs.QUESTS, Tabs.BADGES];

export const Results = ({ navigation }: Props) => {
  const styles = useStylesheet(createStyles);
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.QUESTS);

  return (
    <Container>
      <Col mb={12}>
        <TabSwitch tabs={tabs} selectedTab={selectedTab} onPressTab={setSelectedTab} mb={spacing.lightMargin} />
        <Row style={styles.separator} />
      </Col>
      <Quests navigation={navigation} visible={selectedTab === Tabs.QUESTS} />
      <Badges navigation={navigation} visible={selectedTab === Tabs.BADGES} />
    </Container>
  );
};

const createStyles = ({ insets, colors, spacing, shapes }: Theme) =>
  StyleSheet.create({
    separator: {
      width: '200%',
      marginLeft: -50,
      backgroundColor: colors.bgSurface1,
      height: 1,
      opacity: 0.6,
    },
  });
