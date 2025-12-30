import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";
import splashScreenlogo from "../../assets/splash-icon.png";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const SplashScreen: React.FC<Props> = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Register");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2260FF" translucent={false} />
      <View style={styles.centerWrapper}>
        <Image source={splashScreenlogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Skin First</Text>
        <Text style={styles.subtitle}>Dermatology Center</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2260FF",
  },
  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "300",
    color: "#FFFFFF",
    marginTop: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginTop: 6,
    letterSpacing: 0.5,
  },
});
