import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  assets as authenticationAssets,
  AuthenticationNavigator
} from "./src/Authentication";
import { LoadAssets } from "./src/components";
import { ThemeProvider } from './src/components/Theme';
import { HomeNavigator, assets as homeAssets } from "./src/Home";
import {AppRoutes} from "./src/components/Navigation";

const assets = [...authenticationAssets, ...homeAssets];

const fonts = {
    "Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
    "SemiBold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
    "Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
    "Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf")
};

const AppStack = createNativeStackNavigator<AppRoutes>();

export default function app() {
  return (
    <ThemeProvider>
      <LoadAssets {...{ fonts, assets }}>
        <SafeAreaProvider>
          <AppStack.Navigator screenOptions={{ headerShown: false }}>
              <AppStack.Screen name="Authentication" component={AuthenticationNavigator} />
              <AppStack.Screen name="Home" component={HomeNavigator} />
          </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}