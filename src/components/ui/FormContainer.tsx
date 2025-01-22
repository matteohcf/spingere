import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Col } from "./Col.tsx";
import { Theme } from "../../types";
import { useStylesheet } from "../../hooks/useStylesheet.ts";
import { BoxProps } from "./Box.tsx";

type Props = {
  style?: ViewStyle;
  children?: React.ReactNode;
} & BoxProps;

export const FormContainer = ({ children, ...rest }: Props) => {
  const styles = useStylesheet(createStyles);

  return (
    <Col style={[rest?.style, styles.container]} {...rest}>
      {children}
    </Col>
  );
};

const createStyles = ({ colors, shapes }: Theme) =>
  StyleSheet.create({
    container: {
      padding: 12,
      borderRadius: shapes.md,
    },
  });
