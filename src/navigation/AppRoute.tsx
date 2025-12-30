import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen1 from "../screens/LoginScreen1";
import LoginScreen2 from "../screens/LoginScreen2";
import SignUpScreen from "../screens/SignUpScreen";
import SetPasswordScreen from "../screens/SetPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type RootStackParamList = {
  Splash: undefined;
  Register: undefined;
  Login1: undefined;
  Login2: undefined;
  SignUp: undefined;
  SetPassword: undefined;
  Home: undefined;
  Profile: { userId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Splash" as keyof RootStackParamList}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login1" component={LoginScreen1} />
      <Stack.Screen name="Login2" component={LoginScreen2} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppRoute;
