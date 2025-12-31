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
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, "PasswordManager">;

const PasswordManagerScreen: React.FC<Props> = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2260FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Password Manager</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Current Password</Text>
          <CustomTextInput
            placeholder="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={true}
            showPasswordToggle={true}
            containerStyle={{ marginBottom: 16 }}
          />
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate("SetPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Text style={styles.label}>New Password</Text>
          <CustomTextInput
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
            showPasswordToggle={true}
            containerStyle={{ marginBottom: 16 }}
          />

          <Text style={styles.label}>Confirm New Password</Text>
          <CustomTextInput
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            showPasswordToggle={true}
            containerStyle={{ marginBottom: 24 }}
          />

          <CustomButton
            title="Change Password"
            onPress={() => navigation.goBack()}
            variant="primary"
            style={{ marginTop: 20 }}
          />
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  content: {
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 8,
    marginTop: 4,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#2260FF",
  },
});

export default PasswordManagerScreen;

