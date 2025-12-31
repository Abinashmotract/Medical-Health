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
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "PaymentMethodSelect">;

const PaymentMethodSelectScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState("card");

  const paymentMethods = [
    { id: "card", label: "Add New Card", icon: "card-outline" },
    { id: "apple", label: "Apple Play", icon: "logo-apple" },
    { id: "paypal", label: "Paypal", icon: "logo-paypal" },
    { id: "google", label: "Google Play", icon: "logo-google-playstore" },
  ];

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod(methodId);
    if (methodId === "card") {
      navigation.navigate("AddCard");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2260FF" translucent={false} />
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
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.content}>
          {/* Credit & Debit Card Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Credit & Debit Card</Text>
            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => handleSelectMethod("card")}
            >
              <View style={styles.paymentOptionLeft}>
                <Ionicons name="card-outline" size={24} color="#2260FF" />
                <Text style={styles.paymentOptionText}>Add New Card</Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedMethod === "card" && styles.radioButtonSelected,
                ]}
              >
                {selectedMethod === "card" && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
          </View>

          {/* More Payment Option Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More Payment Option</Text>
            {paymentMethods.slice(1).map((method) => (
              <TouchableOpacity
                key={method.id}
                style={styles.paymentOption}
                onPress={() => handleSelectMethod(method.id)}
              >
                <View style={styles.paymentOptionLeft}>
                  <Ionicons name={method.icon as any} size={24} color="#2260FF" />
                  <Text style={styles.paymentOptionText}>{method.label}</Text>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedMethod === method.id && styles.radioButtonSelected,
                  ]}
                >
                  {selectedMethod === method.id && <View style={styles.radioButtonInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    backgroundColor: "#2260FF",
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    color: "#FFFFFF",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3F2FD",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  paymentOptionText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
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
});

export default PaymentMethodSelectScreen;

