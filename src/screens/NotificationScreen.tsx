import React from "react";
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

type Props = NativeStackScreenProps<RootStackParamList, "Notification">;

interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  message: string;
  time: string;
}

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  const todayNotifications: NotificationItem[] = [
    {
      id: "1",
      icon: "calendar",
      title: "Scheduled Appointment",
      message:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "2 M",
    },
    {
      id: "2",
      icon: "calendar",
      title: "Scheduled Change",
      message:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "2 H",
    },
    {
      id: "3",
      icon: "document-text",
      title: "Medical Notes",
      message:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "3 H",
    },
  ];

  const yesterdayNotifications: NotificationItem[] = [
    {
      id: "4",
      icon: "calendar",
      title: "Scheduled Appointment",
      message:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "1 D",
    },
  ];

  const aprilNotifications: NotificationItem[] = [
    {
      id: "5",
      icon: "document-text",
      title: "Medical History Update",
      message:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "5 D",
    },
  ];

  const renderNotificationItem = (item: NotificationItem) => (
    <View key={item.id} style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon as any} size={24} color="#2260FF" />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2260FF" translucent={false} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate("Home");
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity style={styles.newsButton}>
          <Text style={styles.newsButtonText}>News</Text>
          <View style={styles.newsDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Today Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.datePill}>
              <Text style={styles.datePillText}>Today</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.markAllText}>Mark all</Text>
            </TouchableOpacity>
          </View>
          {todayNotifications.map(renderNotificationItem)}
        </View>

        {/* Yesterday Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.datePill}>
              <Text style={styles.datePillText}>Yesterday</Text>
            </View>
          </View>
          {yesterdayNotifications.map(renderNotificationItem)}
        </View>

        {/* 15 April Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.datePill}>
              <Text style={styles.datePillText}>15 April</Text>
            </View>
          </View>
          {aprilNotifications.map(renderNotificationItem)}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2260FF",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  newsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  newsButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  newsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  datePill: {
    backgroundColor: "#2260FF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  datePillText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  markAllText: {
    fontSize: 14,
    color: "#2260FF",
    fontWeight: "500",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    marginRight: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999999",
    marginTop: 4,
  },
});

export default NotificationScreen;

