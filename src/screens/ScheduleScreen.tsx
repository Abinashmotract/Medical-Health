import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";
import { Ionicons } from "@expo/vector-icons";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, "Schedule">;

const ScheduleScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("24 WED");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [bookingFor, setBookingFor] = useState<"Yourself" | "Another Person">("Another Person");
  const [fullName, setFullName] = useState("Jane Doe");
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Female");
  const [problem, setProblem] = useState("");

  const doctor = {
    name: "Dr. Olivia Turner, M.D.",
  };

  const dates = [
    { day: 22, label: "MON" },
    { day: 23, label: "TUE" },
    { day: 24, label: "WED" },
    { day: 25, label: "THU" },
    { day: 26, label: "FRI" },
    { day: 27, label: "SAT" },
  ];

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2260FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {doctor.name}
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate("Message", { doctorName: doctor.name })}
          >
            <Ionicons name="chatbubble-outline" size={18} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={() => {}}>
            <Ionicons name="call-outline" size={18} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={() => {}}>
            <Ionicons name="location-outline" size={18} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate("HelpCenter")}
          >
            <Ionicons name="help-circle-outline" size={18} color="#2260FF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate("Favorite")}
          >
            <Ionicons name="heart-outline" size={18} color="#2260FF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.content}>
          {/* Month Dropdown */}
          <View style={styles.monthContainer}>
            <Text style={styles.monthLabel}>Month</Text>
            <TouchableOpacity style={styles.monthDropdown}>
              <Text style={styles.monthText}>Select Month</Text>
              <Ionicons name="chevron-down" size={20} color="#2260FF" />
            </TouchableOpacity>
          </View>

          {/* Date Selector */}
          <View style={styles.dateSelectorContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScrollContent}>
              {dates?.map((date) => {
                const dateKey = `${date.day} ${date.label}`;
                const isSelected = selectedDate === dateKey;
                return (
                  <TouchableOpacity
                    key={dateKey}
                    style={[styles.dateButton, isSelected && styles.dateButtonActive]}
                    onPress={() => setSelectedDate(dateKey)}
                  >
                    <Text style={[styles.dateDay, isSelected && styles.dateDayActive]}>{date.day}</Text>
                    <Text style={[styles.dateLabel, isSelected && styles.dateLabelActive]}>{date.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Available Time */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Time</Text>
            <View style={styles.timeGrid}>
              {timeSlots?.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={time}
                    style={[styles.timeSlot, isSelected && styles.timeSlotActive]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[styles.timeSlotText, isSelected && styles.timeSlotTextActive]}>{time}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Patient Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Patient Details</Text>

            {/* Booking For Toggle */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, bookingFor === "Yourself" && styles.toggleButtonActive]}
                onPress={() => setBookingFor("Yourself")}
              >
                <Text
                  style={[styles.toggleButtonText, bookingFor === "Yourself" && styles.toggleButtonTextActive]}
                >
                  Yourself
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, bookingFor === "Another Person" && styles.toggleButtonActive]}
                onPress={() => setBookingFor("Another Person")}
              >
                <Text
                  style={[
                    styles.toggleButtonText,
                    bookingFor === "Another Person" && styles.toggleButtonTextActive,
                  ]}
                >
                  Another Person
                </Text>
              </TouchableOpacity>
            </View>

            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <CustomTextInput
                placeholder="Enter full name"
                value={fullName}
                onChangeText={setFullName}
                containerStyle={styles.input}
              />
            </View>

            {/* Age */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Age</Text>
              <CustomTextInput
                placeholder="Enter age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                containerStyle={styles.input}
              />
            </View>

            {/* Gender */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderContainer}>
                {(["Male", "Female", "Other"] as const).map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[styles.genderButton, gender === g && styles.genderButtonActive]}
                    onPress={() => setGender(g)}
                  >
                    <View style={[styles.radioButton, gender === g && styles.radioButtonSelected]}>
                      {gender === g && <View style={styles.radioButtonInner} />}
                    </View>
                    <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Describe Your Problem */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Describe your problem</Text>
            <TextInput
              style={styles.problemInput}
              placeholder="Enter Your Problem Here..."
              placeholderTextColor="#999999"
              value={problem}
              onChangeText={setProblem}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Continue Button */}
          <CustomButton
            title="Continue"
            onPress={() => navigation.navigate("Details")}
            variant="primary"
            style={styles.continueButton}
          />
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
    fontSize: 16,
    fontWeight: "600",
    color: "#2260FF",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 15,
  },
  monthContainer: {
    marginBottom: 20,
  },
  monthLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2260FF",
    marginBottom: 8,
  },
  monthDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  monthText: {
    fontSize: 16,
    color: "#000000",
  },
  dateSelectorContainer: {
    marginBottom: 24,
  },
  dateScrollContent: {
    gap: 12,
    paddingRight: 20,
  },
  dateButton: {
    paddingHorizontal: 14,
    paddingVertical: 20,
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
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2260FF",
    marginBottom: 10,
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  timeSlot: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    borderWidth: 1,
    borderColor: "#E3F2FD",
  },
  timeSlotActive: {
    backgroundColor: "#2260FF",
    borderColor: "#2260FF",
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2260FF",
  },
  timeSlotTextActive: {
    color: "#FFFFFF",
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E3F2FD",
  },
  toggleButtonActive: {
    backgroundColor: "#2260FF",
    borderColor: "#2260FF",
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2260FF",
  },
  toggleButtonTextActive: {
    color: "#FFFFFF",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
    marginBottom: 6,
  },
  input: {
    marginBottom: 0,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 12,
  },
  genderButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#E3F2FD",
    borderWidth: 1,
    borderColor: "#E3F2FD",
  },
  genderButtonActive: {
    backgroundColor: "#2260FF",
    borderColor: "#2260FF",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2260FF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#FFFFFF",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  genderText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2260FF",
  },
  genderTextActive: {
    color: "#FFFFFF",
  },
  problemInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000000",
    backgroundColor: "#FFFFFF",
    minHeight: 120,
  },
  continueButton: {
    marginTop: 8,
    marginBottom: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 120,
  },
});

export default ScheduleScreen;

