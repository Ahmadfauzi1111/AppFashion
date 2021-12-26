import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  assets as authenticationAssets,
  AuthenticationNavigator
} from "./src/Authentication";
import { LoadAssets, theme } from "./src/components";
import { ThemeProvider } from "@shopify/restyle";
import {AppRoutes} from "./src/components/Navigation";

const assets = [...authenticationAssets];

const fonts = {
    "Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
    "SemiBold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
    "Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
    "Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf")
};

const AppStack = createNativeStackNavigator<AppRoutes>();

export default function app() {
  return (
    <ThemeProvider {...{theme}}>
      <LoadAssets {...{ fonts, assets }}>
        <SafeAreaProvider>
          <AppStack.Navigator screenOptions={{ headerShown: false }}>
              <AppStack.Screen name="Authentication" component={AuthenticationNavigator} />
              {/* <AppStack.Screen name="Home" component={HomeNavigator} /> */}
          </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}