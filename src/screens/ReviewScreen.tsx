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

type Props = NativeStackScreenProps<RootStackParamList, "Review">;

const ReviewScreen: React.FC<Props> = ({ navigation }) => {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState("");

  const doctor = {
    name: "Dr. Olivia Turner, M.D.",
    specialty: "Dermato-Endocrinology",
    image: "👩",
  };

  const handleAddReview = () => {
    // Handle review submission logic here
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
        <Text style={styles.headerTitle}>Review</Text>
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

          {/* Doctor Profile Card */}
          <View style={styles.doctorCard}>
            <View style={styles.doctorImageContainer}>
              <View style={styles.doctorImage}>
                <Text style={styles.doctorEmoji}>{doctor.image}</Text>
              </View>
            </View>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            </View>
          </View>

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>Rate Your Experience</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  style={styles.starButton}
                  onPress={() => setRating(star)}
                >
                  <Ionicons
                    name={star <= rating ? "star" : "star-outline"}
                    size={32}
                    color="#2260FF"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Comment Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Your Comment</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Enter Your Comment Here..."
              placeholderTextColor="#999999"
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Add Review Button */}
          <CustomButton
            title="Add Review"
            onPress={handleAddReview}
            variant="primary"
            style={styles.addReviewButton}
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
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  doctorImageContainer: {
    marginRight: 16,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  doctorEmoji: {
    fontSize: 40,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2260FF",
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#666666",
  },
  ratingSection: {
    marginBottom: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2260FF",
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  starButton: {
    padding: 4,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2260FF",
    marginBottom: 12,
  },
  commentInput: {
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
  addReviewButton: {
    marginBottom: 40,
  },
});

export default ReviewScreen;

