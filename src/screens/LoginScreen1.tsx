import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import CustomTextInput from "../components/CustomTextInput";

type Props = NativeStackScreenProps<RootStackParamList, "Login1">;

const LoginScreen1: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2260FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Log In</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          <CustomTextInput
            placeholder="Email or Mobile Number"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            showPasswordToggle={true}
          />

          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate("SetPassword")}>
            <Text style={styles.forgotPasswordText}>Forget Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>or sign up with</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity style={styles.socialIcon}>
                <FontAwesome name="google" size={22} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <FontAwesome name="facebook" size={22} color="#1877F2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <MaterialIcons name="fingerprint" size={26} color="#2260FF" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.signUpLink} onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpLinkText}>
              Don't have an account?{" "}
              <Text style={styles.signUpLinkBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2260FF",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#2260FF",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 32,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#2260FF",
  },
  loginButton: {
    backgroundColor: "#2260FF",
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 32,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  socialContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  socialText: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 16,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginHorizontal: 8,
  },
  socialIconText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#666666",
  },
  signUpLink: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  signUpLinkText: {
    fontSize: 14,
    color: "#666666",
  },
  signUpLinkBold: {
    fontWeight: "600",
    color: "#2260FF",
  },
});

export default LoginScreen1;

