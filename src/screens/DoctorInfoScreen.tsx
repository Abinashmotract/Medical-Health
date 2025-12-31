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

type Props = NativeStackScreenProps<RootStackParamList, "DoctorInfo">;

const DoctorInfoScreen: React.FC<Props> = ({ navigation }) => {
  const doctor = {
    name: "Dr. Alexander Bennett",
    title: "Ph.D.",
    specialty: "Dermato-Genetics",
    image: "👨",
    experience: "15 years experience",
    focus:
      "The impact of hormonal imbalances on skin conditions, specializing in acne, hirsutism, and other skin disorders.",
    rating: 5,
    reviews: 40,
    workingHours: "Mon-Sat / 9:00AM - 5:00PM",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2260FF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Doctor Info</Text>

        <View style={styles.headerActions}>
          <Ionicons name="search" size={22} color="#2260FF" />
          <Ionicons name="options-outline" size={22} color="#2260FF" />
        </View>
      </View>

      {/* Sort By */}
      <View style={styles.sortRow}>
        <Text style={styles.sortText}>Sort By</Text>

        <View style={styles.sortButtonActive}>
          <Text style={styles.sortActiveText}>A–Z</Text>
        </View>

        <View style={styles.sortIcon}>
          <Ionicons name="star" size={16} color="#2260FF" onPress={() => navigation.navigate("Rating")}/>
        </View>
        <View style={styles.sortIcon}>
          <Ionicons name="heart-outline" size={16} color="#2260FF" onPress={() => navigation.navigate("FavoriteServices")}/>
        </View>
        <View style={styles.sortIcon}>
          <Ionicons name="location-outline" size={16} color="#2260FF" onPress={() => navigation.navigate("FavoriteServices")}/>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Doctor Card */}
        <View style={styles.doctorCard}>
          <View style={styles.cardTop}>
            {/* Image */}
            <View style={styles.avatar}>
              <Text style={{ fontSize: 48 }}>{doctor.image}</Text>
            </View>

            {/* Right info */}
            <View style={{ flex: 1 }}>
              <View style={styles.experienceBadge}>
                <Ionicons name="time-outline" size={14} color="#2260FF" />
                <Text style={styles.experienceText}>{doctor.experience}</Text>
              </View>

              <View style={styles.focusBox}>
                <Text style={styles.focusText}>{doctor.focus}</Text>
              </View>
            </View>
          </View>

          {/* Name */}
          <View style={styles.namePill}>
            <Text style={styles.nameText}>
              {doctor.name}, {doctor.title}
            </Text>
            <Text style={styles.specialtyText}>{doctor.specialty}</Text>
          </View>

          {/* Meta */}
          <View style={styles.metaRow}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.metaText}>{doctor.rating}</Text>

            <Ionicons name="chatbubble-outline" size={14} color="#2260FF" />
            <Text style={styles.metaText}>{doctor.reviews}</Text>

            <Ionicons name="time-outline" size={14} color="#2260FF" />
            <Text style={styles.metaText}>{doctor.workingHours}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actionRow}>
            <CustomButton
              title="Schedule"
              onPress={() => navigation.navigate("Schedule")}
              variant="primary"
              style={styles.scheduleButton}
            />

            <View style={styles.iconCircle}>
              <Ionicons name="information-circle-outline" size={20} color="#2260FF" />
            </View>
            <View style={styles.iconCircle}>
              <Ionicons name="help-circle-outline" size={20} color="#2260FF" />
            </View>
            <View style={styles.iconCircle}>
              <Ionicons name="heart-outline" size={20} color="#2260FF" />
            </View>
          </View>
        </View>

        {/* Text Sections */}
        {["Profile", "Career Path", "Highlights"].map((title) => (
          <View key={title} style={styles.textBlock}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2260FF",
  },
  headerActions: { flexDirection: "row", gap: 14 },

  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
  },
  sortText: { fontSize: 14, color: "#666" },
  sortButtonActive: {
    backgroundColor: "#2260FF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  sortActiveText: { color: "#FFF", fontWeight: "600" },
  sortIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },

  doctorCard: {
    backgroundColor: "#DCE7FF",
    margin: 16,
    borderRadius: 20,
    padding: 16,
  },
  cardTop: { flexDirection: "row", gap: 12 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#BFD3FF",
    justifyContent: "center",
    alignItems: "center",
  },

  experienceBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    marginBottom: 6,
  },
  experienceText: { fontSize: 12, color: "#2260FF" },

  focusBox: {
    backgroundColor: "#2260FF",
    borderRadius: 12,
    padding: 10,
  },
  focusText: { color: "#FFF", fontSize: 12, lineHeight: 16 },

  namePill: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    marginTop: 12,
    alignItems: "center",
  },
  nameText: { fontSize: 16, fontWeight: "600", color: "#2260FF" },
  specialtyText: { fontSize: 12, color: "#666" },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    flexWrap: "wrap",
  },
  metaText: { fontSize: 12, color: "#2260FF", marginRight: 6 },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  scheduleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 120,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },

  textBlock: { paddingHorizontal: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 6, color: "#2260FF" },
  sectionText: { fontSize: 14, color: "#666", lineHeight: 20 },
});


export default DoctorInfoScreen;

