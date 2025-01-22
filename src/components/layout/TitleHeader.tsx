import { ModalProps as RNModalProps } from "react-native-modal/dist/modal";
import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { Col, Icon, Row, Text } from "../ui";
import { useStylesheet } from "../../hooks/useStylesheet.ts";
import { Theme } from "../../types";
import { colors, spacing } from "../../constant";

export type TitleHeaderProps = Partial<RNModalProps> &
  PropsWithChildren<{
    goBack?: boolean;
    text: string;
    navigation?: any;
  }>;

export const TitleHeader = ({
  goBack = true,
  text,
  children,
  navigation,
}: TitleHeaderProps) => {
  const styles = useStylesheet(createStyles);

  const onPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <Row
      h={64}
      gap={12}
      style={[styles.container]}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      {goBack && (
        <Icon
          icon={["far", "arrow-left"]}
          size={16}
          color={colors.white}
          onPress={onPress}
        />
      )}
      <Col flex={1} ml={spacing.screenHorizontal}>
        <Text variant={'Heading/Small/SemiBold'}>
          {text}
        </Text>
      </Col>
      {children && <Col mr={spacing.screenHorizontal}>{children}</Col>}
    </Row>
  );
};

const createStyles = ({}: Theme) =>
  StyleSheet.create({
    container: {
      padding: 0,
      margin: 0,
    },
  });
