import React from 'react';
import { PropsWithChildren, useRef } from 'react';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const NavigatorProvider = ({ children }: PropsWithChildren) => {
  const routeNameRef = useRef<string>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          // logScreenView(currentRouteName);
        }
        routeNameRef.current = currentRouteName;
      }}>
      {children}
    </NavigationContainer>
  );
};
