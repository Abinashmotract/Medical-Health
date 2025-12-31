import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";
import CustomButton from "../components/CustomButton";
import splashScreenlogo1 from "../../assets/splashScreenlogo1.png";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <View style={styles.content}>
        <View style={styles.centerWrapper}>
          <Image source={splashScreenlogo1} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Skin First</Text>
          <Text style={styles.subtitle}>Dermatology Center</Text>
        </View>

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Log In"
            onPress={() => navigation.navigate("Login1")}
            variant="primary"
          />
          <CustomButton
            title="Sign Up"
            onPress={() => navigation.navigate("SignUp")}
            variant="secondary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    justifyContent: "space-between",
    paddingBottom: 40,
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
    color: "#2260FF",
    marginTop: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2260FF",
    marginTop: 6,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 22,
    textAlign: "center",
    marginVertical: 30,
  },
  buttonContainer: {
    gap: 16,
  },
});

export default RegisterScreen;

