import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Platform,
  Modal,
  Image,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";
import { Ionicons } from "@expo/vector-icons";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<RootStackParamList, "EditProfile">;

const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState("John Doe");
  const [phoneNumber, setPhoneNumber] = useState("+123 567 89000");
  const [email, setEmail] = useState("johndoe@example.com");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (event.type === "set" && date) {
        setSelectedDate(date);
        setDateOfBirth(formatDate(date));
      }
    } else {
      if (date) {
        setSelectedDate(date);
      }
    }
  };

  const confirmDateIOS = () => {
    setDateOfBirth(formatDate(selectedDate));
    setShowDatePicker(false);
  };

  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
        Alert.alert("Permission Required", "Please grant camera and media library permissions to upload images.");
        return false;
      }
    }
    return true;
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setShowImagePickerModal(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const pickImageFromCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setShowImagePickerModal(false);
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleImagePicker = () => {
    setShowImagePickerModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2260FF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="settings-outline" size={22} color="#2260FF" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Profile Picture */}
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImageSource} />
              ) : (
                <Text style={styles.profileEmoji}>👨</Text>
              )}
              <TouchableOpacity style={styles.editIcon} onPress={handleImagePicker}>
                <Ionicons name="pencil" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Fields */}
          <Text style={styles.label}>Full Name</Text>
          <CustomTextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            containerStyle={{ marginBottom: 16 }}
          />

          <Text style={styles.label}>Phone Number</Text>
          <CustomTextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            containerStyle={{ marginBottom: 16 }}
          />

          <Text style={styles.label}>Email</Text>
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={{ marginBottom: 16 }}
          />

          <Text style={styles.label}>Date Of Birth</Text>
          <TouchableOpacity
            style={styles.datePickerContainer}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.datePickerText,
                dateOfBirth ? styles.datePickerTextFilled : styles.datePickerTextPlaceholder,
              ]}
            >
              {dateOfBirth || "DD / MM / YYYY"}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#999999" style={styles.calendarIcon} />
          </TouchableOpacity>

          {Platform.OS === "ios" ? (
            <Modal
              visible={showDatePicker}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowDatePicker(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                      <Text style={styles.modalCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Select Date</Text>
                    <TouchableOpacity onPress={confirmDateIOS}>
                      <Text style={styles.modalConfirmText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={onDateChange}
                    maximumDate={new Date()}
                    style={styles.datePickerIOS}
                  />
                </View>
              </View>
            </Modal>
          ) : (
            showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )
          )}

          <CustomButton
            title="Update Profile"
            onPress={() => navigation.goBack()}
            variant="primary"
            style={{ marginTop: 20 }}
          />
        </View>
      </ScrollView>

      {/* Image Picker Modal */}
      <Modal
        visible={showImagePickerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImagePickerModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Image</Text>
            <View style={styles.imagePickerButtons}>
              <TouchableOpacity style={styles.imagePickerButton} onPress={pickImageFromCamera}>
                <Ionicons name="camera" size={24} color="#2260FF" />
                <Text style={styles.imagePickerButtonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imagePickerButton} onPress={pickImageFromGallery}>
                <Ionicons name="images" size={24} color="#2260FF" />
                <Text style={styles.imagePickerButtonText}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.cancelImagePickerButton}
              onPress={() => setShowImagePickerModal(false)}
            >
              <Text style={styles.cancelImagePickerText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  settingButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2260FF",
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
    paddingHorizontal: 24,
  },
  content: {
    paddingBottom: 40,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileEmoji: {
    fontSize: 50,
  },
  profileImageSource: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2260FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 8,
    marginTop: 4,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  datePickerText: {
    fontSize: 16,
    flex: 1,
  },
  datePickerTextPlaceholder: {
    color: "#999999",
  },
  datePickerTextFilled: {
    color: "#000000",
  },
  calendarIcon: {
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  modalCancelText: {
    fontSize: 16,
    color: "#666666",
  },
  modalConfirmText: {
    fontSize: 16,
    color: "#2260FF",
    fontWeight: "600",
  },
  datePickerIOS: {
    width: "100%",
    height: 200,
  },
  imagePickerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 24,
    gap: 20,
  },
  imagePickerButton: {
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#E3F2FD",
    minWidth: 100,
  },
  imagePickerButtonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#2260FF",
  },
  cancelImagePickerButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelImagePickerText: {
    fontSize: 16,
    color: "#666666",
  },
});

export default EditProfileScreen;

