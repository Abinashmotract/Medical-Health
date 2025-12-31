import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer, NavigationState } from "@react-navigation/native";
import AppRoute from "./src/navigation/AppRoute";
import BottomNavigation from "./src/components/BottomNavigation";
import { NavigationProvider, useNavigationContext } from "./src/context/NavigationContext";
import { RootStackParamList } from "./src/navigation/AppRoute";

const NavigationWrapper = () => {
  const { setCurrentRoute } = useNavigationContext();

  const getActiveRouteName = (state: NavigationState | undefined): keyof RootStackParamList => {
    if (!state || typeof state.index !== "number") {
      return "Splash";
    }

    const route = state.routes[state.index];

    if (route.state) {
      return getActiveRouteName(route.state as NavigationState);
    }

    return route.name as keyof RootStackParamList;
  };

  return (
    <NavigationContainer
      onStateChange={(state) => {
        const routeName = getActiveRouteName(state);
        setCurrentRoute(routeName);
      }}
    >
      <View style={styles.container}>
        <AppRoute />
        <BottomNavigation />
      </View>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <NavigationProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
        <NavigationWrapper />
      </View>
    </NavigationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
