import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import React, { useRef } from "react";
import Todos from '../screens/Todos';
import CustomDrawer from "./CustomDrawer";

export function DrawerStack() {
  const Drawer = createDrawerNavigator();
  const navigationRef = useRef(null);

  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <Drawer.Navigator
        initialRouteName="Todos"
        drawerContent={CustomDrawer}
        screenOptions={{
          headerTintColor: "black",
          activeTintColor: '#000',
          activeBackgroundColor: "white",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            color: "black",
          },
          drawerStyle: {
            width: 200,
          }
        }}
        op
        drawerType='slide'
        edgeWidth={30}
      >
        <Drawer.Screen name="Todos" component={Todos} />
      </Drawer.Navigator>
    </NavigationContainer>
  );

}
