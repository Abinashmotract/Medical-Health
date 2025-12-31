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
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "HelpCenter">;

const HelpCenterScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<"FAQ" | "ContactUs">("FAQ");
  const [activeSubTab, setActiveSubTab] = useState<"Popular" | "General" | "Services">("Popular");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = [
    {
      id: 0,
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 1,
      question: "Ut enim ad minim veniam?",
      answer:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 2,
      question: "Duis aute irure dolor?",
      answer:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];

  const contactItems = [
    { id: "1", icon: "headset", label: "Customer Service", type: "ionicons" },
    { id: "2", icon: "globe-outline", label: "Website", type: "ionicons" },
    { id: "3", icon: "logo-whatsapp", label: "Whatsapp", type: "ionicons" },
    { id: "4", icon: "logo-facebook", label: "Facebook", type: "ionicons" },
    { id: "5", icon: "logo-instagram", label: "Instagram", type: "ionicons" },
  ];

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2260FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help Center</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <Text style={styles.subtitle}>How Can We Help You?</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "FAQ" && styles.tabActive]}
              onPress={() => setActiveTab("FAQ")}
            >
              <Text style={[styles.tabText, activeTab === "FAQ" && styles.tabTextActive]}>
                FAQ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "ContactUs" && styles.tabActive]}
              onPress={() => setActiveTab("ContactUs")}
            >
              <Text
                style={[styles.tabText, activeTab === "ContactUs" && styles.tabTextActive]}
              >
                Contact Us
              </Text>
            </TouchableOpacity>
          </View>

          {/* FAQ Content */}
          {activeTab === "FAQ" && (
            <>
              {/* Sub Tabs */}
              <View style={styles.subTabsContainer}>
                <TouchableOpacity
                  style={[
                    styles.subTab,
                    activeSubTab === "Popular" && styles.subTabActive,
                  ]}
                  onPress={() => setActiveSubTab("Popular")}
                >
                  <Text
                    style={[
                      styles.subTabText,
                      activeSubTab === "Popular" && styles.subTabTextActive,
                    ]}
                  >
                    Popular Topic
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.subTab, activeSubTab === "General" && styles.subTabActive]}
                  onPress={() => setActiveSubTab("General")}
                >
                  <Text
                    style={[
                      styles.subTabText,
                      activeSubTab === "General" && styles.subTabTextActive,
                    ]}
                  >
                    General
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.subTab, activeSubTab === "Services" && styles.subTabActive]}
                  onPress={() => setActiveSubTab("Services")}
                >
                  <Text
                    style={[
                      styles.subTabText,
                      activeSubTab === "Services" && styles.subTabTextActive,
                    ]}
                  >
                    Services
                  </Text>
                </TouchableOpacity>
              </View>

              {/* FAQ Items */}
              <View style={styles.faqContainer}>
                {faqItems.map((item) => (
                  <View key={item.id} style={styles.faqItem}>
                    <TouchableOpacity
                      style={styles.faqQuestion}
                      onPress={() => toggleFAQ(item.id)}
                    >
                      <Text style={styles.faqQuestionText}>{item.question}</Text>
                      <Ionicons
                        name={expandedFAQ === item.id ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#2260FF"
                      />
                    </TouchableOpacity>
                    {expandedFAQ === item.id && (
                      <Text style={styles.faqAnswer}>{item.answer}</Text>
                    )}
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Contact Us Content */}
          {activeTab === "ContactUs" && (
            <View style={styles.contactContainer}>
              {contactItems.map((item) => (
                <TouchableOpacity key={item.id} style={styles.contactItem}>
                  <View style={styles.menuIconWrapper}>
                    <Ionicons name={item.icon as any} size={22} color="#2260FF" />
                  </View>
                  <Text style={styles.contactItemText}>{item.label}</Text>
                  <Ionicons name="chevron-down" size={20} color="#999999" />
                </TouchableOpacity>
              ))}
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
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000000",
    padding: 0,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 50,
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
  subTabsContainer: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  subTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 50,
  },
  subTabActive: {
    backgroundColor: "#2260FF",
  },
  subTabText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2260FF",
  },
  subTabTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  faqContainer: {
    gap: 12,
  },
  faqItem: {
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginTop: 12,
  },
  menuIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 22,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  contactContainer: {
    gap: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  contactItemText: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
});

export default HelpCenterScreen;

