import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Switch,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "NotificationSetting">;

const NotificationSettingScreen: React.FC<Props> = ({ navigation }) => {
  const [notifications, setNotifications] = useState({
    general: true,
    sound: true,
    soundCall: true,
    vibrate: false,
    specialOffers: false,
    payments: true,
    promoAndDiscount: false,
    cashback: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationItems = [
    { key: "general" as const, label: "General Notification" },
    { key: "sound" as const, label: "Sound" },
    { key: "soundCall" as const, label: "Sound Call" },
    { key: "vibrate" as const, label: "Vibrate" },
    { key: "specialOffers" as const, label: "Special Offers" },
    { key: "payments" as const, label: "Payments" },
    { key: "promoAndDiscount" as const, label: "Promo And Discount" },
    { key: "cashback" as const, label: "Cashback" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2260FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notification Setting</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          {notificationItems?.map((item) => (
            <View key={item.key} style={styles.notificationItem}>
              <Text style={styles.notificationLabel}>{item.label}</Text>
              <Switch
                value={notifications[item.key]}
                onValueChange={() => toggleNotification(item.key)}
                trackColor={{ false: "#E0E0E0", true: "#2260FF" }}
                thumbColor="#FFFFFF"
              />
            </View>
          ))}
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
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  notificationLabel: {
    fontSize: 16,
    color: "#000000",
  },
});

export default NotificationSettingScreen;

