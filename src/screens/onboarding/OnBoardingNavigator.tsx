import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../../hooks/useTheme";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { userSelectors } from "../../store/user";
import React from "react";
import { headerTitleStyle } from "../../core/navigation/RootNavigator.tsx";
import { Login } from "./Login.tsx";
import { Register } from "./Register.tsx";
import { ForgotPassword } from "./ForgotPassword.tsx";
import { HeaderLeft } from "../../components";
import { colors } from "../../constant";

export type OnBoardingStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Register: undefined;
};

export const baseOptionsHeader = {
  // headerTitleStyle: HeaterTitleStyle,
  headerStyle: {
    backgroundColor: colors.containerBckGround,
  },
  headerShown: true,
  headerTitleStyle: headerTitleStyle,
  headerBackTitleVisible: false,
  headerTransparent: false,
  headerTitleAlign: "left",
  statusBarTranslucent: true,
  statusBarHidden: false,
  statusBarColor: "transparent",
  statusBarStyle: "dark",
  headerShadowVisible: false,
};

export const OnBoardingNavigator = () => {
  const Stack = createNativeStackNavigator<OnBoardingStackParamList>();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const userDetail = useSelector(userSelectors.detail);

  return (
    <Stack.Navigator
      screenOptions={{
        ...baseOptionsHeader,
      }}
    >
      <Stack.Screen
        options={{
          title: "",
          ...baseOptionsHeader,
          headerLeft: () => <HeaderLeft />,
        }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{
          title: "",
          ...baseOptionsHeader,
          headerLeft: () => <HeaderLeft showBack />,
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          title: t("reset password"),
          ...baseOptionsHeader,
          headerLeft: () => <HeaderLeft showBack />,
        }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};
