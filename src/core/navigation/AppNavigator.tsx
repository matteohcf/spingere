import React, { useEffect } from "react";
import { useStoreRehydrate } from "../../hooks/useStoreRehydratate";
import { useSelector } from "react-redux";
import { userSelectors } from "../../store/user";
import { RootNavigator } from "./RootNavigator.tsx";
import RNSplashScreen from "react-native-splash-screen";
import { OnBoardingNavigator } from "../../screens/onboarding/OnBoardingNavigator.tsx";
import { TutorialNavigator } from "./TutorialNavigator.tsx";
import { useFirebase } from "../../utils/firebase.ts";

export const AppNavigator = () => {
  const isLogged = useSelector(userSelectors.isLogged);
  const visitedTutorial = useSelector(userSelectors.visitedTutorial);
  const { isReady } = useStoreRehydrate();
  useFirebase();

  useEffect(() => {
    setTimeout(() => {
      RNSplashScreen.hide();
    }, 1500);
  }, []);

  if (!isReady) {
    return <></>;
  }

  if (!visitedTutorial) {
    return <TutorialNavigator />;
  }

  if (!isLogged) {
    return <OnBoardingNavigator />;
  }

  return <RootNavigator />;
};
