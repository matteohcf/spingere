import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {SharedStackParamList} from "../../core/navigation/RootNavigator.tsx";
import {useStylesheet} from "../../hooks/useStylesheet.ts";
import {Theme} from "../../types";
import {ScrollView, StyleSheet} from "react-native";
import {Col, Container, Row} from "../../components";
import React, {useState} from "react";
import {TabSwitch} from "../../components/layout/TabSwitch.tsx";
import {spacing} from "../../constant";

type Props = NativeStackScreenProps<SharedStackParamList, 'MyStatistics'>;

enum Tabs {
  STATISTICS = 'statistics',
  BADGES = 'badges',
}

const tabs = [Tabs.STATISTICS, Tabs.BADGES];

export const MyStatistics = ({ navigation }: Props) => {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.STATISTICS);
  const styles = useStylesheet(createStyles);
  return (
    <Container useGradient addPaddingHeader={true}>
      <Col mb={12}>
        <TabSwitch tabs={tabs} selectedTab={selectedTab} onPressTab={setSelectedTab} mb={spacing.lightMargin} />
      </Col>
    </Container>
  )
}

const createStyles = ({ shapes, colors, insets }: Theme) => StyleSheet.create({

});
