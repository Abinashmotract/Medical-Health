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
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, "FavoriteServices">;

interface Service {
  id: string;
  name: string;
  description: string;
  expanded: boolean;
}

const FavoriteServicesScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<"Doctors" | "Services">("Services");
  const [sortBy, setSortBy] = useState("A-Z");
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Dermato-Endocrinology",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam.",
      expanded: true,
    },
    {
      id: "2",
      name: "Cosmetic Bioengineering",
      description: "",
      expanded: false,
    },
    {
      id: "3",
      name: "Dermato-Genetics",
      description: "",
      expanded: false,
    },
    {
      id: "4",
      name: "Solar Dermatology",
      description: "",
      expanded: false,
    },
    {
      id: "5",
      name: "Dermato-Endocrinology",
      description: "",
      expanded: false,
    },
  ]);

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, expanded: !service.expanded } : service
      )
    );
  };

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
        <Text style={styles.headerTitle}>Favorite</Text>
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
        <Text style={styles.sortByLabel}>Sort By</Text>
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
          style={[styles.sortIconButton, sortBy === "Male" && styles.sortButtonActive]}
          onPress={() => setSortBy("Male")}
        >
          <Ionicons
            name="male"
            size={20}
            color={sortBy === "Male" ? "#FFFFFF" : "#2260FF"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortIconButton, sortBy === "Female" && styles.sortButtonActive]}
          onPress={() => setSortBy("Female")}
        >
          <Ionicons
            name="female"
            size={20}
            color={sortBy === "Female" ? "#FFFFFF" : "#2260FF"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.content}>
          {/* Tab Buttons */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === "Doctors" && styles.tabButtonActive]}
              onPress={() => {
                setActiveTab("Doctors");
                navigation.navigate("Favorite");
              }}
            >
              <Text
                style={[styles.tabButtonText, activeTab === "Doctors" && styles.tabButtonTextActive]}
              >
                Doctors
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === "Services" && styles.tabButtonActive]}
              onPress={() => setActiveTab("Services")}
            >
              <Text
                style={[styles.tabButtonText, activeTab === "Services" && styles.tabButtonTextActive]}
              >
                Services
              </Text>
            </TouchableOpacity>
          </View>

          {/* Services List */}
          {services.map((service) => (
            <View key={service.id} style={styles.serviceContainer}>
              <TouchableOpacity
                style={styles.serviceButton}
                onPress={() => toggleService(service.id)}
              >
                <Ionicons name="heart" size={20} color="#2260FF" style={styles.heartIcon} />
                <Text style={styles.serviceButtonText}>{service.name}</Text>
                <Ionicons
                  name={service.expanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#2260FF"
                />
              </TouchableOpacity>
              {service.expanded && service.description && (
                <View style={styles.serviceContent}>
                  <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>{service.description}</Text>
                  </View>
                  <CustomButton
                    title="looking doctors"
                    onPress={() => navigation.navigate("Doctors")}
                    variant="secondary"
                    style={{ marginTop: 12 }}
                  />
                </View>
              )}
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
  sortByLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
    marginRight: 8,
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
  tabContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: "#2260FF",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2260FF",
  },
  tabButtonTextActive: {
    color: "#FFFFFF",
  },
  serviceContainer: {
    marginBottom: 12,
  },
  serviceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2260FF",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  heartIcon: {
    marginRight: 4,
  },
  serviceButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  serviceContent: {
    marginTop: 12,
  },
  descriptionBox: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: "#000000",
    lineHeight: 20,
  },
});

export default FavoriteServicesScreen;

