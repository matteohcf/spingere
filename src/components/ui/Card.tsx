import React from "react";
import { StyleSheet } from "react-native";
import { BoxProps } from "./Box";
import { Col } from "./Col.tsx";
import {lightTheme, SHADOW} from "../../constant";

export const Card = ({ children, style, br, ...rest }: BoxProps) => {
  const multipleStyles = [styles.card, br && { borderRadius: br }, style];

  return (
    <Col style={multipleStyles} {...rest}>
      {children}
    </Col>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: lightTheme.shapes.md,
    backgroundColor: lightTheme.colors.bgPrimary,
    padding: 12,
    ...SHADOW.MEDIUM
  },
});
