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
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, "AllAppointment">;

interface Appointment {
  id: string;
  doctorName: string;
  doctorTitle: string;
  specialty: string;
  image: string;
  rating?: number;
  date?: string;
  time?: string;
  status: "complete" | "upcoming" | "cancelled";
}

const AllAppointmentScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<"Complete" | "Upcoming" | "Cancelled">("Complete");

  const appointments: Appointment[] = [
    {
      id: "1",
      doctorName: "Dr. Olivia Turner",
      doctorTitle: "M.D.",
      specialty: "Dermato-Endocrinology",
      image: "👩",
      rating: 5,
      status: "complete",
    },
    {
      id: "2",
      doctorName: "Dr. Alexander Bennett",
      doctorTitle: "Ph.D.",
      specialty: "Dermato-Genetics",
      image: "👨",
      rating: 4,
      status: "complete",
    },
    {
      id: "3",
      doctorName: "Dr. Sophia Martinez",
      doctorTitle: "Ph.D.",
      specialty: "Cosmetic Bioengineering",
      image: "👩",
      date: "Sunday, 12 June",
      time: "9:30 AM - 10:00 AM",
      status: "upcoming",
    },
    {
      id: "4",
      doctorName: "Dr. Michael Davidson",
      doctorTitle: "M.D.",
      specialty: "Solar Dermatology",
      image: "👨",
      date: "Monday, 13 June",
      time: "2:00 PM - 2:30 PM",
      status: "upcoming",
    },
    {
      id: "5",
      doctorName: "Dr. Olivia Turner",
      doctorTitle: "M.D.",
      specialty: "Dermato-Endocrinology",
      image: "👩",
      status: "cancelled",
    },
  ];

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === "Complete") return apt.status === "complete";
    if (activeTab === "Upcoming") return apt.status === "upcoming";
    return apt.status === "cancelled";
  });

  const renderAppointmentCard = (appointment: Appointment) => (
    <View key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.doctorImageContainer}>
          <View style={styles.doctorImage}>
            <Text style={styles.doctorEmoji}>{appointment.image}</Text>
          </View>
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>
            {appointment.doctorName}, {appointment.doctorTitle}
          </Text>
          <Text style={styles.doctorSpecialty}>{appointment.specialty}</Text>
        </View>
        {appointment.rating && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#2260FF" />
            <Text style={styles.ratingText}>{appointment.rating}</Text>
          </View>
        )}
        {appointment.status === "complete" && (
          <TouchableOpacity style={styles.heartIcon}>
            <Ionicons name="heart-outline" size={20} color="#2260FF" />
          </TouchableOpacity>
        )}
      </View>

      {appointment.status === "upcoming" && (
        <View style={styles.appointmentDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#2260FF" />
            <Text style={styles.detailText}>{appointment.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#2260FF" />
            <Text style={styles.detailText}>{appointment.time}</Text>
          </View>
        </View>
      )}

      <View style={styles.cardActions}>
        {appointment.status === "complete" && (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.reBookButton]}
              onPress={() => navigation.navigate("Doctors")}
            >
              <Text style={styles.reBookButtonText}>Re-Book</Text>
            </TouchableOpacity>
            <CustomButton
              title="Add Review"
              onPress={() => navigation.navigate("Review", { doctorId: appointment.id })}
              variant="primary"
              style={styles.actionButton}
            />
          </>
        )}
        {appointment.status === "upcoming" && (
          <>
            <CustomButton
              title="Details"
              onPress={() => navigation.navigate("Details")}
              variant="primary"
              style={styles.detailsButton}
            />
            <View style={styles.actionIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="checkmark-circle" size={24} color="#2260FF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("CancelAppointment", { appointmentId: appointment.id })}
              >
                <Ionicons name="close-circle" size={24} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </>
        )}
        {appointment.status === "cancelled" && (
          <CustomButton
            title="Add Review"
            onPress={() => navigation.navigate("Review", { doctorId: appointment.id })}
            variant="primary"
            style={styles.singleButton}
          />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2260FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Appointment</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Complete" && styles.tabActive]}
          onPress={() => setActiveTab("Complete")}
        >
          <Text style={[styles.tabText, activeTab === "Complete" && styles.tabTextActive]}>
            Complete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Upcoming" && styles.tabActive]}
          onPress={() => setActiveTab("Upcoming")}
        >
          <Text style={[styles.tabText, activeTab === "Upcoming" && styles.tabTextActive]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Cancelled" && styles.tabActive]}
          onPress={() => setActiveTab("Cancelled")}
        >
          <Text style={[styles.tabText, activeTab === "Cancelled" && styles.tabTextActive]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointments List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.content}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(renderAppointmentCard)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No {activeTab.toLowerCase()} appointments</Text>
            </View>
          )}
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
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
    color: "#2260FF",
    textAlign: "center",
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#2260FF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2260FF",
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 15,
  },
  appointmentCard: {
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  doctorImageContainer: {
    marginRight: 12,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  doctorEmoji: {
    fontSize: 22,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2260FF"
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#666666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2260FF",
  },
  heartIcon: {
    padding: 4,
  },
  appointmentDetails: {
    marginBottom: 12,
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#2260FF",
    fontWeight: "500",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 100,
  },
  reBookButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2260FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  reBookButtonText: {
    color: "#2260FF",
    fontSize: 14,
    fontWeight: "600",
  },
  detailsButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 100,
  },
  actionIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  singleButton: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 100,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666666",
  },
});

export default AllAppointmentScreen;

