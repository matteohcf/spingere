import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TutorialScreen } from '../../screens/tutorial/Tutorial.tsx';
import {baseOptionsHeader} from "../../screens/onboarding/OnBoardingNavigator.tsx";

export type TutorialStackParamList = {
  Tutorial: undefined;
};

const Stack = createNativeStackNavigator<TutorialStackParamList>();

export const TutorialNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...baseOptionsHeader,
      }}>
      <Stack.Screen
        name={'Tutorial'}
        component={TutorialScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
