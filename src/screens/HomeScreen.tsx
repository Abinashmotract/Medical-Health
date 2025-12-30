import React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Medical Health - Home</Text>

      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile", { userId: "123" })}
      />
    </View>
  );
};

export default HomeScreen;
