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
import { Ionicons } from "@expo/vector-icons";
import CustomTextInput from "../components/CustomTextInput";

type Props = NativeStackScreenProps<RootStackParamList, "Login2">;

const LoginScreen2: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2260FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hello!</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome</Text>

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

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate("SetPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forget Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>or</Text>
            <TouchableOpacity style={styles.fingerprintIcon}>
              <Text style={styles.fingerprintIconText}>👆</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.signUpLink}
            onPress={() => navigation.navigate("SignUp")}
          >
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
    color: "#000000",
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
  fingerprintIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  fingerprintIconText: {
    fontSize: 20,
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

export default LoginScreen2;

