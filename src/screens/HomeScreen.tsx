import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

interface Doctor {
  id: string;
  name: string;
  degree: string;
  specialty: string;
  rating: number;
  reviews: number;
  isFavorite: boolean;
  image: string;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState<"Doctors" | "Favorite">("Doctors");
  const [selectedDate, setSelectedDate] = useState(11);
  const [searchQuery, setSearchQuery] = useState("");

  const daysOfWeek = [
    { day: 9, label: "MON" },
    { day: 10, label: "TUE" },
    { day: 11, label: "WED" },
    { day: 12, label: "THU" },
    { day: 13, label: "FRI" },
    { day: 14, label: "SAT" },
  ];

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Olivia Turner",
      degree: "M.D.",
      specialty: "Dermato-Endocrinology",
      rating: 5,
      reviews: 60,
      isFavorite: true,
      image: "👩‍⚕️",
    },
    {
      id: "2",
      name: "Dr. Alexander Bennett",
      degree: "Ph.D.",
      specialty: "Dermato-Genetics",
      rating: 4.5,
      reviews: 40,
      isFavorite: false,
      image: "👨‍⚕️",
    },
    {
      id: "3",
      name: "Dr. Sophia Martinez",
      degree: "Ph.D.",
      specialty: "Cosmetic Bioengineering",
      rating: 5,
      reviews: 150,
      isFavorite: false,
      image: "👩‍⚕️",
    },
    {
      id: "4",
      name: "Dr. Michael Davidson",
      degree: "M.D.",
      specialty: "Nano-Dermatology",
      rating: 4.8,
      reviews: 90,
      isFavorite: true,
      image: "👨‍⚕️",
    },
  ];

  const renderDoctorCard = ({ item }: { item: Doctor }) => (
    <View style={styles.doctorCard}>
      <View style={styles.doctorImageContainer}>
        <Text style={styles.doctorEmoji}>{item.image}</Text>
      </View>
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>
          {item.name}, {item.degree}
        </Text>
        <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <MaterialIcons name="chat-bubble-outline" size={12} color="#666666" />
          <Text style={styles.reviewsText}>{item.reviews}</Text>
        </View>
      </View>
      <View style={styles.doctorActions}>
        <TouchableOpacity style={styles.actionIcon}>
          <Ionicons name="help-circle-outline" size={20} color="#2260FF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon}>
          <FontAwesome
            name={item.isFavorite ? "heart" : "heart-o"}
            size={20}
            color={item.isFavorite ? "#FF6B6B" : "#666666"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              <Text style={styles.profileEmoji}>👨</Text>
            </View>
            <View style={styles.greetingSection}>
              <Text style={styles.greetingText}>Hi, WelcomeBack</Text>
              <Text style={styles.userName}>John Doe</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Notification")}>
              <Ionicons name="notifications-outline" size={24} color="#2260FF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Settings")}>
              <Ionicons name="settings-outline" size={24} color="#2260FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Navigation Tabs and Search */}
        <View style={styles.navSection}>
          <View style={styles.navRow}>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => navigation.navigate("Doctors")}
            >
              <MaterialCommunityIcons
                name="stethoscope"
                size={22}
                color="#2260FF"
              />
              <Text style={[styles.tabText, styles.tabTextActive]}>
                Doctors
              </Text>
            </TouchableOpacity>

            {/* Favorite */}
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => navigation.navigate("Favorite")}
            >
              <FontAwesome name="heart-o" size={20} color="#2260FF" />
              <Text style={[styles.tabText, styles.tabTextActive]}>
                Favorite
              </Text>
            </TouchableOpacity>

            {/* Search */}
            <View style={styles.searchBarInline}>
              <TouchableOpacity>
                <Ionicons name="options-outline" size={18} color="#666666" />
              </TouchableOpacity>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity>
                <Ionicons name="search" size={18} color="#666666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Date Selector */}
        <View style={styles.dateSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScrollContent}>
            {daysOfWeek?.map((day) => (
              <TouchableOpacity
                key={day.day}
                style={[
                  styles.dateButton,
                  selectedDate === day.day && styles.dateButtonActive,
                ]}
                onPress={() => setSelectedDate(day.day)}
              >
                <Text
                  style={[
                    styles.dateDay,
                    selectedDate === day.day && styles.dateDayActive,
                  ]}
                >
                  {day.day}
                </Text>
                <Text
                  style={[
                    styles.dateLabel,
                    selectedDate === day.day && styles.dateLabelActive,
                  ]}
                >
                  {day.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Appointments Section */}
        <View style={styles.appointmentsSection}>
          <Text style={styles.appointmentsHeader}>11 Wednesday - Today</Text>
          <View style={styles.timeSlotsContainer}>
            <View style={styles.timeSlot}>
              <Text style={styles.timeText}>9 AM</Text>
              <View style={styles.timeLine} />
            </View>
            <View style={styles.timeSlot}>
              <Text style={styles.timeText}>10 AM</Text>
              <View style={styles.timeLine}>
                <View style={styles.appointmentCard}>
                  <View style={styles.appointmentContent}>
                    <View style={styles.appointmentHeaderRow}>
                      <Text style={styles.appointmentDoctor}>
                        Dr. Olivia Turner, M.D.
                      </Text>
                      <View style={styles.appointmentActionsInline}>
                        <TouchableOpacity style={styles.appointmentActionButton}>
                          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.appointmentActionButton}>
                          <Ionicons name="close-circle" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.appointmentTime}>10 AM - 11 AM</Text>
                    <Text style={styles.appointmentDescription}>
                      Treatment and prevention of skin and photodermatitis.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.timeSlot}>
              <Text style={styles.timeText}>11 AM</Text>
              <View style={styles.timeLine} />
            </View>
            <View style={styles.timeSlot}>
              <Text style={styles.timeText}>12 AM</Text>
              <View style={styles.timeLine} />
            </View>
          </View>
        </View>

        {/* Doctors List */}
        <View style={styles.doctorsSection}>
          <FlatList data={doctors} renderItem={renderDoctorCard} keyExtractor={(item) => item.id} scrollEnabled={false} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  profileEmoji: {
    fontSize: 30,
  },
  greetingSection: {
    justifyContent: "center",
  },
  greetingText: {
    fontSize: 14,
    color: "#5BA3F5",
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2260FF",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  navSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabText: {
    fontSize: 10,
    color: "#999999",
    fontWeight: "500",
  },

  tabTextActive: {
    color: "#2260FF",
    fontWeight: "600",
  },

  searchBarInline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 5,
    gap: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000000",
    padding: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 16,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tabActive: {
    // Active state styling
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F7FA",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  dateSelector: {
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  dateScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  dateButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: "#E3F2FD",
    alignItems: "center"
  },
  dateButtonActive: {
    backgroundColor: "#2260FF",
  },
  dateDay: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2260FF",
    marginBottom: 4,
  },
  dateDayActive: {
    color: "#FFFFFF",
  },
  dateLabel: {
    fontSize: 12,
    color: "#2260FF",
  },
  dateLabelActive: {
    color: "#FFFFFF",
  },
  appointmentsSection: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 8,
  },
  appointmentsHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2260FF",
    textAlign: "center",
    marginBottom: 16,
  },
  timeSlotsContainer: {
    gap: 16,
  },
  timeSlot: {
    flexDirection: "row",
    gap: 12,
  },
  timeText: {
    fontSize: 14,
    color: "#2260FF",
    width: 50,
  },
  timeLine: {
    flex: 1,
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: "#BBDEFB",
    position: "relative",
  },
  appointmentCard: {
    backgroundColor: "#2260FF",
    borderRadius: 12,
    padding: 12,
    marginTop: -8,
  },
  appointmentContent: {
    flex: 1,
  },
  appointmentHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appointmentActionsInline: {
    flexDirection: "row",
    gap: 6,
  },
  appointmentActionButton: {
    padding: 2,
  },
  appointmentDoctor: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
  },
  appointmentTime: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 4,
  },
  appointmentDescription: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  doctorsSection: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  doctorCard: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  doctorImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  doctorEmoji: {
    fontSize: 30,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2260FF",
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "500",
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 4,
  },
  doctorActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionIcon: {
    padding: 4,
  },
});

export default HomeScreen;
