import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, "PaymentReview">;

const PaymentReviewScreen: React.FC<Props> = ({ navigation }) => {
  const handlePayNow = () => {
    navigation.navigate("PaymentSuccess");
  };

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
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Payment Amount */}
        <View style={styles.amountSection}>
          <Text style={styles.amountText}>$ 100.00</Text>
        </View>

        <View style={styles.content}>
          {/* Doctor Information */}
          <View style={styles.doctorCard}>
            <View style={styles.doctorHeader}>
              <View style={styles.doctorImageContainer}>
                <View style={styles.doctorImage}>
                  <Text style={styles.doctorEmoji}>👩</Text>
                </View>
                <View style={styles.badgeIcon}>
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.doctorInfo}>
                <View style={styles.doctorNameRow}>
                  <Text style={styles.doctorName}>Dr. Olivia Turner, M.D.</Text>
                </View>
                <Text style={styles.doctorSpecialty}>Dermato-Endocrinology</Text>
                <View style={styles.doctorRating}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>5</Text>
                  <Ionicons name="chatbubble-outline" size={16} color="#666666" style={styles.reviewIcon} />
                  <Text style={styles.reviewsText}>60</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Appointment Details */}
          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date / Hour</Text>
              <Text style={styles.detailValue}>Month 24, Year / 10:00 AM</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>30 Minutes</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Booking for</Text>
              <Text style={styles.detailValue}>Another Person</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Payment Summary */}
          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount</Text>
              <Text style={styles.summaryValue}>$100.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration</Text>
              <Text style={styles.summaryValue}>30 Minutes</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>$100</Text>
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.paymentMethodSection}>
            <Text style={styles.paymentMethodLabel}>Payment Method</Text>
            <View style={styles.paymentMethodRow}>
              <Text style={styles.paymentMethodValue}>Card</Text>
              <TouchableOpacity onPress={() => navigation.navigate("PaymentMethodSelect")}>
                <Text style={styles.changeLink}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Pay Now Button */}
      <View style={styles.buttonContainer}>
        <CustomButton title="Pay Now" onPress={handlePayNow} variant="primary" />
      </View>
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
  scrollView: {
    flex: 1,
  },
  amountSection: {
    backgroundColor: "#2260FF",
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  amountText: {
    fontSize: 36,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  doctorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  doctorHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorImageContainer: {
    position: "relative",
    marginRight: 12,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  doctorEmoji: {
    fontSize: 30,
  },
  badgeIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2260FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  doctorInfo: {
    flex: 1,
  },
  doctorNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  doctorRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginRight: 8,
  },
  reviewIcon: {
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detailLabel: {
    fontSize: 14,
    color: "#2260FF",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  summarySection: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2260FF",
  },
  paymentMethodSection: {
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    padding: 16,
  },
  paymentMethodLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  paymentMethodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentMethodValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  changeLink: {
    fontSize: 14,
    color: "#2260FF",
    fontWeight: "500",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
});

export default PaymentReviewScreen;

