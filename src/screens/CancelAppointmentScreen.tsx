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
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, "CancelAppointment">;

const CancelAppointmentScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedReason, setSelectedReason] = useState<string>("Weather Conditions");
  const [reasonText, setReasonText] = useState("");

  const cancellationReasons = [
    "Rescheduling",
    "Weather Conditions",
    "Unexpected Work",
    "Others",
  ];

  const handleCancel = () => {
    // Handle cancellation logic here
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2260FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cancel Appointment</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.content}>
          {/* Introduction Text */}
          <Text style={styles.introText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris.
          </Text>

          {/* Cancellation Reasons */}
          <View style={styles.reasonsSection}>
            <Text style={styles.sectionTitle}>Select Reason</Text>
            {cancellationReasons.map((reason) => (
              <TouchableOpacity
                key={reason}
                style={styles.reasonOption}
                onPress={() => setSelectedReason(reason)}
              >
                <View style={[styles.radioButton, selectedReason === reason && styles.radioButtonSelected]}>
                  {selectedReason === reason && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={[styles.reasonText, selectedReason === reason && styles.reasonTextActive]}>
                  {reason}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Additional Information */}
          <Text style={styles.infoText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>

          {/* Reason Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.reasonInput}
              placeholder="Enter Your Reason Here..."
              placeholderTextColor="#999999"
              value={reasonText}
              onChangeText={setReasonText}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Cancel Button */}
          <CustomButton
            title="Cancel Appointment"
            onPress={handleCancel}
            variant="primary"
            style={styles.cancelButton}
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
    fontSize: 20,
    fontWeight: "600",
    color: "#2260FF",
    textAlign: "center",
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  introText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 24,
  },
  reasonsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2260FF",
    marginBottom: 16,
  },
  reasonOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2260FF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#2260FF",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2260FF",
  },
  reasonText: {
    fontSize: 14,
    color: "#666666",
    flex: 1,
  },
  reasonTextActive: {
    color: "#2260FF",
    fontWeight: "500",
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: "#E3F2FD",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000000",
    backgroundColor: "#FFFFFF",
    minHeight: 120,
  },
  cancelButton: {
    marginBottom: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 120,
  },
});

export default CancelAppointmentScreen;

