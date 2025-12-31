import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/AppRoute";
import { useNavigationContext } from "../context/NavigationContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BottomNavigation = () => {
  const navigation = useNavigation<NavigationProp>();
  const { currentRoute } = useNavigationContext();

  // Screens where bottom navigation should NOT appear
  const hiddenScreens = [
    "Splash",
    "Register",
    "Login1",
    "Login2",
    "SignUp",
    "SetPassword",
    // MyProfile menu items screens
    "EditProfile",
    "PrivacyPolicy",
    "Settings",
    "HelpCenter",
    // Settings sub-screens
    "NotificationSetting",
    "PasswordManager",
    "DeleteAccount",
    // Chat and Notification screens
    "Notification",
    "Message",
    // Payment screens
    "PaymentMethodSelect",
    "AddCard",
    "PaymentReview",
    "PaymentSuccess",
    // Doctor screens
    "DoctorInfo",
    "Rating",
    "FavoriteServices",
    "FemaleDoctors",
    "MaleDoctors",
  ];

  if (hiddenScreens.includes(currentRoute)) {
    return null;
  }

  const handleNavigation = (screenName: keyof RootStackParamList) => {
    if (currentRoute !== screenName) {
      (navigation.navigate as any)(screenName);
    }
  };

  return (
    <View style={styles.bottomNavWrapper}>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation("Home")}>
          <Ionicons name={currentRoute === "Home" ? "home" : "home-outline"} size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation("Message")}>
          <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation("MyProfile")}>
          <Ionicons name={currentRoute === "MyProfile" ? "person" : "person-outline"} size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation("AllAppointment")}>
          <Ionicons
            name={currentRoute === "AllAppointment" ? "calendar" : "calendar-outline"}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F5F7FA",
    paddingVertical: 8,
    alignItems: "center",
  },
  bottomNav: {
    width: "85%",
    flexDirection: "row",
    backgroundColor: "#2260FF",
    paddingVertical: 12,
    justifyContent: "space-around",
    borderRadius: 40,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  navItem: {
    padding: 4,
  },
});

export default BottomNavigation;

