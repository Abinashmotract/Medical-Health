import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Platform,
  Modal,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import CustomTextInput from "../components/CustomTextInput";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (event.type === "set" && date) {
        setSelectedDate(date);
        setDateOfBirth(formatDate(date));
      }
    } else {
      // iOS - handle in modal
      if (date) {
        setSelectedDate(date);
      }
    }
  };

  const confirmDateIOS = () => {
    setDateOfBirth(formatDate(selectedDate));
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2260FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Account</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Full Name</Text>
          <CustomTextInput
            placeholder="Full name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            containerStyle={{ marginBottom: 6 }}
          />

          <Text style={styles.label}>Password</Text>
          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            showPasswordToggle={true}
            containerStyle={{ marginBottom: 6 }}
          />

          <Text style={styles.label}>Email</Text>
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={{ marginBottom: 6 }}
          />

          <Text style={styles.label}>Mobile Number</Text>
          <CustomTextInput
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
            containerStyle={{ marginBottom: 6 }}
          />

          <Text style={styles.label}>Date Of Birth</Text>

          <TouchableOpacity
            style={styles.datePickerContainer}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.datePickerText,
                dateOfBirth ? styles.datePickerTextFilled : styles.datePickerTextPlaceholder,
              ]}
            >
              {dateOfBirth || "Date Of Birth"}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#999999" style={styles.calendarIcon} />
          </TouchableOpacity>

          {Platform.OS === "ios" ? (
            <Modal
              visible={showDatePicker}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowDatePicker(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                      <Text style={styles.modalCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Select Date</Text>
                    <TouchableOpacity onPress={confirmDateIOS}>
                      <Text style={styles.modalConfirmText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={onDateChange}
                    maximumDate={new Date()}
                    style={styles.datePickerIOS}
                  />
                </View>
              </View>
            </Modal>
          ) : (
            showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )
          )}

          <Text style={styles.termsText}>
            By continuing, you agree to{" "}
            <Text style={styles.termsLink}>Terms of Use</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>

          <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
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

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login1")}
          >
            <Text style={styles.loginLinkText}>
              already have an account?{" "}
              <Text style={styles.loginLinkBold}>Log in</Text>
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
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
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
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 8,
    marginTop: 4,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 6,
    backgroundColor: "#FFFFFF",
  },
  datePickerText: {
    fontSize: 16,
    flex: 1,
  },
  datePickerTextPlaceholder: {
    color: "#999999",
  },
  datePickerTextFilled: {
    color: "#000000",
  },
  calendarIcon: {
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  modalCancelText: {
    fontSize: 16,
    color: "#666666",
  },
  modalConfirmText: {
    fontSize: 16,
    color: "#2260FF",
    fontWeight: "600",
  },
  datePickerIOS: {
    width: "100%",
    height: 200,
  },
  termsText: {
    fontSize: 12,
    color: "#666666",
    lineHeight: 18,
    marginBottom: 24,
    textAlign: "center",
  },
  termsLink: {
    textDecorationLine: "underline",
    color: "#2260FF",
  },
  signUpButton: {
    backgroundColor: "#2260FF",
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20,
  },
  signUpButtonText: {
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
    marginBottom: 6,
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
  loginLink: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  loginLinkText: {
    fontSize: 14,
    color: "#666666",
  },
  loginLinkBold: {
    fontWeight: "600",
    color: "#2260FF",
  },
});

export default SignUpScreen;

