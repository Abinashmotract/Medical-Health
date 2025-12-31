import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ActivityIndicator } from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
  ...otherProps
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryButton;
      case "danger":
        return styles.dangerButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryButtonText;
      case "danger":
        return styles.dangerButtonText;
      default:
        return styles.primaryButtonText;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...otherProps}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#FFFFFF" : "#2260FF"} />
      ) : (
        <Text style={[getTextStyle(), disabled && styles.disabledButtonText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#2260FF",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  dangerButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#2260FF",
    fontSize: 16,
    fontWeight: "600",
  },
  dangerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButtonText: {
    opacity: 0.7,
  },
});

export default CustomButton;

