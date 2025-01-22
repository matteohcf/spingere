import React from "react";
import LottieView from "lottie-react-native";
import { Col } from "./Col.tsx";

export const LottieHeaderLogo = () => {
  return (
    <Col h={72} w={72} mb={4}>
      <LottieView
        source={require("../../assets/lottie/animatedLogo3.json")}
        style={{ width: "100%", height: "100%" }}
        autoPlay
        loop
      />
    </Col>
  );
};
