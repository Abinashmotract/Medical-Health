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
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, "AddCard">;

const AddCardScreen: React.FC<Props> = ({ navigation }) => {
  const [cardHolderName, setCardHolderName] = useState("John Doe");
  const [cardNumber, setCardNumber] = useState("000 000 000 00");
  const [expiryDate, setExpiryDate] = useState("04/28");
  const [cvv, setCvv] = useState("0000");

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.slice(0, 19);
  };

  const handleCardNumberChange = (text: string) => {
    const formatted = formatCardNumber(text);
    setCardNumber(formatted);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleExpiryDateChange = (text: string) => {
    const formatted = formatExpiryDate(text);
    setExpiryDate(formatted);
  };

  const handleSaveCard = () => {
    navigation.navigate("PaymentReview");
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
        <Text style={styles.headerTitle}>Add Card</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.content}>
          {/* Card Visual Representation */}
          <View style={styles.cardVisual}>
            <View style={styles.cardChip}>
              <View style={styles.chipIcon} />
            </View>
            <Text style={styles.cardNumber}>{cardNumber || "000 000 000 00"}</Text>
            <View style={styles.cardDetails}>
              <View>
                <Text style={styles.cardLabel}>Card Holder Name</Text>
                <Text style={styles.cardValue}>{cardHolderName || "John Doe"}</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>Expiry Date</Text>
                <Text style={styles.cardValue}>{expiryDate || "04/28"}</Text>
              </View>
            </View>
          </View>

          {/* Input Fields */}
          <Text style={styles.label}>Card Holder Name</Text>
          <CustomTextInput
            placeholder="Card Holder Name"
            value={cardHolderName}
            onChangeText={setCardHolderName}
            containerStyle={{ marginBottom: 16 }}
          />

          <Text style={styles.label}>Card Number</Text>
          <CustomTextInput
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            keyboardType="numeric"
            maxLength={19}
            containerStyle={{ marginBottom: 16 }}
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Expiry Date</Text>
              <CustomTextInput
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                keyboardType="numeric"
                maxLength={5}
                containerStyle={{ marginBottom: 16 }}
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>CVV</Text>
              <CustomTextInput
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                secureTextEntry={true}
                maxLength={4}
                containerStyle={{ marginBottom: 16 }}
              />
            </View>
          </View>

          <CustomButton
            title="Save Card"
            onPress={handleSaveCard}
            variant="primary"
            style={{ marginTop: 20 }}
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
  cardVisual: {
    backgroundColor: "#2260FF",
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    height: 200,
    justifyContent: "space-between",
  },
  cardChip: {
    alignSelf: "flex-end",
  },
  chipIcon: {
    width: 40,
    height: 30,
    backgroundColor: "#FFD700",
    borderRadius: 4,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginVertical: 20,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 8,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
});

export default AddCardScreen;

