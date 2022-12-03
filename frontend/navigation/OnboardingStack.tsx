import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "../screens/auth/RegisterScreen";
import LoginScreen from "../screens/auth/LoginScreen";

export function OnboardingStack() {
  const RootStackNav = createStackNavigator();
  const navigationRef = useRef(null);

  return (
    <NavigationContainer
      ref={navigationRef} >
      <RootStackNav.Navigator >

        <RootStackNav.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />

        <RootStackNav.Screen
          name="RegisterUser"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />

      </RootStackNav.Navigator>
    </NavigationContainer>
  );
}
