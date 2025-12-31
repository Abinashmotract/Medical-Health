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
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, "PaymentSuccess">;

const PaymentSuccessScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2260FF" translucent={false} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Successfully</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Indicator */}
        <View style={styles.successIndicator}>
          <View style={styles.checkmarkCircle}>
            <Ionicons name="checkmark" size={60} color="#2260FF" />
          </View>
        </View>

        {/* Confirmation Message */}
        <Text style={styles.congratulationsText}>Congratulation</Text>
        <Text style={styles.successMessage}>Payment is Successfully</Text>

        {/* Booking Confirmation Details */}
        <View style={styles.bookingCard}>
          <Text style={styles.bookingText}>
            You have successfully booked an appointment with
          </Text>
          <Text style={styles.doctorName}>Dr. Olivia Turner, M.D.</Text>
          <View style={styles.bookingDetails}>
            <View style={styles.bookingDetailItem}>
              <Ionicons name="calendar-outline" size={20} color="#2260FF" />
              <Text style={styles.bookingDetailText}>Month 24, Year</Text>
            </View>
            <View style={styles.bookingDetailItem}>
              <Ionicons name="time-outline" size={20} color="#2260FF" />
              <Text style={styles.bookingDetailText}>10:00 AM</Text>
            </View>
          </View>
        </View>

        <CustomButton
          title="Done"
          onPress={() => navigation.navigate("Home")}
          variant="primary"
          style={{ marginTop: 30 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2260FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2260FF",
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: "center",
  },
  successIndicator: {
    alignItems: "center",
    marginBottom: 30,
  },
  checkmarkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  congratulationsText: {
    fontSize: 32,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  successMessage: {
    fontSize: 20,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 40,
    textAlign: "center",
  },
  bookingCard: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    marginBottom: 20,
  },
  bookingText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 20,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2260FF",
    textAlign: "center",
    marginBottom: 20,
  },
  bookingDetails: {
    gap: 12,
  },
  bookingDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
  },
  bookingDetailText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
});

export default PaymentSuccessScreen;

