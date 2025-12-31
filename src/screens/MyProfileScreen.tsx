import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Modal,
  Image,
  Alert,
  Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<RootStackParamList, "MyProfile">;

const MyProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);

  const menuItems = [
    { id: "1", icon: "person-outline", label: "Profile", screen: "EditProfile" },
    { id: "2", icon: "heart-outline", label: "Favorite", screen: "Favorite" },
    { id: "3", icon: "wallet-outline", label: "Payment Method", screen: "PaymentMethodSelect" },
    { id: "4", icon: "lock-closed-outline", label: "Privacy Policy", screen: "PrivacyPolicy" },
    { id: "5", icon: "settings-outline", label: "Settings", screen: "Settings" },
    { id: "6", icon: "help-circle-outline", label: "Help", screen: "HelpCenter" },
    { id: "7", icon: "log-out-outline", label: "Logout", action: "logout" },
  ];

  const handleMenuPress = (item: typeof menuItems[0]) => {
    if (item.action === "logout") {
      setShowLogoutModal(true);
    } else if (item.screen) {
      navigation.navigate(item.screen as any);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigation.replace("Login1");
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
      <StatusBar barStyle="dark-content" backgroundColor="#E3F2FD" translucent={false} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
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
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImageSource} />
              ) : (
                <Text style={styles.profileEmoji}>👨</Text>
              )}
            </View>
            <TouchableOpacity style={styles.editIcon} onPress={handleImagePicker}>
              <Ionicons name="pencil" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems?.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item)}>
              <View style={styles.menuIconWrapper}>
                <Ionicons name={item.icon as any} size={22} color="#2260FF" />
              </View>
              <Text style={styles.menuItemText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#999999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <CustomButton
                title="Cancel"
                onPress={() => setShowLogoutModal(false)}
                variant="secondary"
                style={{ flex: 1 }}
              />
              <CustomButton
                title="Yes, Logout"
                onPress={handleLogout}
                variant="primary"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Picker Modal */}
      <Modal
        visible={showImagePickerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImagePickerModal(false)}
      >
        <View style={styles.modalOverlay}>
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
    backgroundColor: "#E3F2FD",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
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
  profileSection: {
    alignItems: "center",
    backgroundColor: "#E3F2FD",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
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
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingTop: 10,
    marginTop: 10
  },
  menuIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 22,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2260FF",
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
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

export default MyProfileScreen;

