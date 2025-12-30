import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppRoute from "./src/navigation/AppRoute";

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <NavigationContainer>
        <AppRoute />
      </NavigationContainer>
    </>
  );
};

export default App;
