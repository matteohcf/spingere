import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useStyleProps } from "../../hooks/useStyleProps";
import { useFlexProps } from "../../hooks/useFlexProps";
import { Col } from "./Col";
import { Icon } from "./Icon";
import { FlexProps, StyleProps, Theme } from "../../types";
import { useTheme } from "../../hooks/useTheme";
import { useStylesheet } from "../../hooks/useStylesheet";
import { colors } from "../../constant";

type Props = PropsWithChildren<
  StyleProps &
    FlexProps & {
      containerStyle?: StyleProp<ViewStyle>;
      style?: StyleProp<ViewStyle>;
      checked?: boolean;
      onCheck?: () => void;
    }
>;

export const Checkbox = ({
  style,
  checked,
  onCheck,
  containerStyle,
  ...rest
}: Props) => {
  const styleProps = useStyleProps(rest);
  const flexProps = useFlexProps(rest);
  const styles = useStylesheet(createStyles);

  const buttonStyle = [
    styleProps,
    flexProps,
    styles.checkbox,
    style,
    { backgroundColor: colors.bgSurface2 },
  ];

  return (
    <Col
      pointerEvents={onCheck ? "auto" : "none"}
      onPress={() => onCheck && onCheck()}
      style={containerStyle}
    >
      <Col style={buttonStyle}>
        {checked && (
          <Icon icon={["fas", "check"]} color={colors.textGrey} size={16} />
        )}
      </Col>
    </Col>
  );
};

const createStyles = ({ colors, shapes }: Theme) =>
  StyleSheet.create({
    checkbox: {
      height: 32,
      width: 32,
      borderWidth: 2,
      borderRadius: shapes.md,
      borderColor: colors.borderDefault,
      alignItems: "center",
      justifyContent: "center",
    },
    checked: {
      color: colors.black,
    },
  });
