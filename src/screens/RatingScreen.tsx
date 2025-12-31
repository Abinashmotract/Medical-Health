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

type Props = NativeStackScreenProps<RootStackParamList, "Rating">;

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  rating: number;
}

const RatingScreen: React.FC<Props> = ({ navigation }) => {
  const [sortBy, setSortBy] = useState("Rating");

  const doctors: Doctor[] = [
    {
      id: "3",
      name: "Dr. Olivia Turner",
      title: "M.D.",
      specialty: "Dermato-Endocrinology",
      image: "👩",
      rating: 5,
    },
    {
      id: "1",
      name: "Dr. Alexander Bennett",
      title: "Ph.D.",
      specialty: "Dermato-Genetics",
      image: "👨",
      rating: 5,
    },
    {
      id: "4",
      name: "Dr. Sophia Martinez",
      title: "Ph.D.",
      specialty: "Cosmetic Bioengineering",
      image: "👩",
      rating: 4.9,
    },
    {
      id: "2",
      name: "Dr. Michael Davidson",
      title: "M.D.",
      specialty: "Solar Dermatology",
      image: "👨",
      rating: 4.8,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
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
          <Ionicons name="arrow-back" size={24} color="#2260FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rating</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="search" size={24} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="options-outline" size={24} color="#2260FF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sort By Bar */}
      <View style={styles.sortByBar}>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === "A-Z" && styles.sortButtonActive]}
          onPress={() => setSortBy("A-Z")}
        >
          <Text style={[styles.sortButtonText, sortBy === "A-Z" && styles.sortButtonTextActive]}>
            A-Z
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortIconButton, sortBy === "Rating" && styles.sortButtonActive]}
          onPress={() => setSortBy("Rating")}
        >
          <Ionicons
            name="star"
            size={20}
            color={sortBy === "Rating" ? "#FFFFFF" : "#2260FF"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortIconButton, sortBy === "Location" && styles.sortButtonActive]}
          onPress={() => setSortBy("Location")}
        >
          <Ionicons
            name="location"
            size={20}
            color={sortBy === "Location" ? "#FFFFFF" : "#2260FF"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortIconButton, sortBy === "Gender" && styles.sortButtonActive]}
          onPress={() => setSortBy("Gender")}
        >
          <Ionicons
            name="people"
            size={20}
            color={sortBy === "Gender" ? "#FFFFFF" : "#2260FF"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.content}>
          {doctors.map((doctor) => (
            <View key={doctor.id} style={styles.doctorCard}>
              <View style={styles.doctorHeader}>
                <View style={styles.professionalBadge}>
                  <Ionicons name="medical" size={16} color="#2260FF" />
                  <Text style={styles.professionalText}>Professional Doctor</Text>
                </View>
              </View>
              <View style={styles.doctorContent}>
                <View style={styles.doctorImageContainer}>
                  <View style={styles.doctorImage}>
                    <Text style={styles.doctorEmoji}>{doctor.image}</Text>
                  </View>
                </View>
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>
                    {doctor.name}, {doctor.title}
                  </Text>
                  <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={18} color="#FFD700" />
                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.doctorActions}>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => navigation.navigate("DoctorInfo", { doctorId: doctor.id })}
                >
                  <Text style={styles.infoButtonText}>Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <Ionicons name="calendar-outline" size={20} color="#2260FF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <Ionicons name="information-circle-outline" size={20} color="#2260FF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <Ionicons name="help-circle-outline" size={20} color="#2260FF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <Ionicons name="heart-outline" size={20} color="#2260FF" />
                </TouchableOpacity>
              </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    color: "#2260FF",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerIconButton: {
    padding: 4,
  },
  sortByBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
  },
  sortButtonActive: {
    backgroundColor: "#2260FF",
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2260FF",
  },
  sortButtonTextActive: {
    color: "#FFFFFF",
  },
  sortIconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
  doctorCard: {
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
  },
  doctorHeader: {
    marginBottom: 12,
  },
  professionalBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  professionalText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2260FF",
  },
  doctorContent: {
    flexDirection: "row",
    marginBottom: 12,
  },
  doctorImageContainer: {
    marginRight: 12,
  },
  doctorImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  doctorEmoji: {
    fontSize: 20,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 3,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#666666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  doctorActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoButton: {
    backgroundColor: "#2260FF",
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
  },
  infoButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  actionIcon: {
    padding: 4,
  },
});

export default RatingScreen;

