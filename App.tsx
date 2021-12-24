import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Animated from "react-native-reanimated";

import { Onboarding, Welcome } from "./src/Authentication";
import { LoadAssets, theme } from "./src/components";
import { ThemeProvider } from "@shopify/restyle";

const fonts = {
    "Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
    "SemiBold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
    "Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
    "Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf")
};

const AuthenticationStack = createNativeStackNavigator();
const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
    </AuthenticationStack.Navigator>
  );
};


export default function app() {
  return (
    <ThemeProvider {...{theme}}>
      <LoadAssets {...{ fonts }}>
        <AuthenticationNavigator />
      </LoadAssets>
    </ThemeProvider>
  );
}