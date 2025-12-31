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

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

const DetailsScreen: React.FC<Props> = ({ navigation }) => {
  const data = {
    doctor: {
      name: "Dr. Olivia Turner, M.D.",
      specialty: "Dermato-Endocrinology",
      image: "👩",
      rating: 5,
      reviews: 60,
    },
    date: "Month 24, Year",
    dayTime: "WED, 10:00 AM",
    bookingFor: "Another Person",
    fullName: "Jane Doe",
    age: "30",
    gender: "Female",
    problem:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2260FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Appointment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Doctor Card */}
          <View style={styles.doctorCard}>
            <View style={styles.doctorRow}>
              <View style={styles.avatar}>
                <Text style={{ fontSize: 32 }}>{data.doctor.image}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.namePill}>
                  <Text style={styles.doctorName}>{data.doctor.name}</Text>
                </View>
                <Text style={styles.specialty}>{data.doctor.specialty}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaChip}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.metaText}>{data.doctor.rating}</Text>
                  </View>
                  <View style={styles.metaChip}>
                    <Ionicons name="chatbubble-outline" size={12} color="#2260FF" />
                    <Text style={styles.metaText}>{data.doctor.reviews}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.actionRow}>
                <View style={styles.circleIcon}>
                  <Ionicons name="help-circle-outline" size={18} color="#2260FF" />
                </View>
                <View style={styles.circleIcon}>
                  <Ionicons name="heart-outline" size={18} color="#2260FF" />
                </View>
              </View>
            </View>
          </View>

          {/* Date Card */}
          <View style={styles.dateRow}>
            <View style={styles.datePill}>
              <Text style={styles.dateText}>{data.date}</Text>
              <Text style={styles.dayText}>{data.dayTime}</Text>
            </View>

            <View style={styles.dateActions}>
              <View style={styles.circlePrimary}>
                <Ionicons name="checkmark" size={18} color="#FFFFFF" />
              </View>
              <View style={styles.circlePrimary}>
                <Ionicons name="close" size={18} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Booking Details */}
          <View style={styles.infoSection}>
            {[
              ["Booking For", data.bookingFor],
              ["Full Name", data.fullName],
              ["Age", data.age],
              ["Gender", data.gender],
            ].map(([label, value]) => (
              <View key={label} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Problem */}
          <View>
            <Text style={styles.problemTitle}>Problem</Text>
            <Text style={styles.problemText}>{data.problem}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2260FF",
  },

  content: { padding: 16 },

  doctorCard: {
    backgroundColor: "#DCE7FF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  doctorRow: { flexDirection: "row", gap: 12 },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  namePill: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  doctorName: { fontSize: 14, fontWeight: "600", color: "#2260FF" },
  specialty: { fontSize: 12, color: "#666", marginVertical: 4 },

  metaRow: { flexDirection: "row", gap: 8 },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metaText: { fontSize: 12, color: "#2260FF" },

  actionRow: { gap: 8 },
  circleIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  datePill: {
    backgroundColor: "#2260FF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dateText: { color: "#FFFFFF", fontWeight: "600", fontSize: 14 },
  dayText: { color: "#FFFFFF", fontSize: 12 },

  dateActions: { flexDirection: "row", gap: 12 },
  circlePrimary: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2260FF",
    justifyContent: "center",
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },

  infoSection: { gap: 14 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: { color: "#666", fontSize: 14 },
  infoValue: { color: "#2260FF", fontWeight: "600", fontSize: 14 },

  problemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2260FF",
    marginBottom: 8,
  },
  problemText: { fontSize: 14, color: "#666", lineHeight: 20 },
});

export default DetailsScreen;

