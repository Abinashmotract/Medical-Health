import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen1 from "../screens/LoginScreen1";
import LoginScreen2 from "../screens/LoginScreen2";
import SignUpScreen from "../screens/SignUpScreen";
import SetPasswordScreen from "../screens/SetPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationSettingScreen from "../screens/NotificationSettingScreen";
import PasswordManagerScreen from "../screens/PasswordManagerScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import HelpCenterScreen from "../screens/HelpCenterScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import NotificationScreen from "../screens/NotificationScreen";
import MessageScreen from "../screens/MessageScreen";
import PaymentMethodSelectScreen from "../screens/PaymentMethodSelectScreen";
import AddCardScreen from "../screens/AddCardScreen";
import PaymentReviewScreen from "../screens/PaymentReviewScreen";
import PaymentSuccessScreen from "../screens/PaymentSuccessScreen";
import DoctorsScreen from "../screens/DoctorsScreen";
import DoctorInfoScreen from "../screens/DoctorInfoScreen";
import RatingScreen from "../screens/RatingScreen";
import FavoriteServicesScreen from "../screens/FavoriteServicesScreen";
import FemaleDoctorsScreen from "../screens/FemaleDoctorsScreen";
import MaleDoctorsScreen from "../screens/MaleDoctorsScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import DetailsScreen from "../screens/DetailsScreen";
import AllAppointmentScreen from "../screens/AllAppointmentScreen";
import CancelAppointmentScreen from "../screens/CancelAppointmentScreen";
import ReviewScreen from "../screens/ReviewScreen";

export type RootStackParamList = {
  Splash: undefined;
  Register: undefined;
  Login1: undefined;
  Login2: undefined;
  SignUp: undefined;
  SetPassword: undefined;
  Home: undefined;
  Profile: { userId: string };
  MyProfile: undefined;
  EditProfile: undefined;
  Favorite: undefined;
  Settings: undefined;
  NotificationSetting: undefined;
  PasswordManager: undefined;
  PrivacyPolicy: undefined;
  HelpCenter: undefined;
  DeleteAccount: undefined;
  Notification: undefined;
  Message: { doctorName?: string };
  PaymentMethodSelect: undefined;
  AddCard: undefined;
  PaymentReview: undefined;
  PaymentSuccess: undefined;
  Doctors: undefined;
  DoctorInfo: { doctorId?: string };
  Rating: undefined;
  FavoriteServices: undefined;
  FemaleDoctors: undefined;
  MaleDoctors: undefined;
  Schedule: undefined;
  Details: undefined;
  AllAppointment: undefined;
  CancelAppointment: { appointmentId?: string };
  Review: { doctorId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Splash" as keyof RootStackParamList}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login1" component={LoginScreen1} />
      <Stack.Screen name="Login2" component={LoginScreen2} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="NotificationSetting" component={NotificationSettingScreen} />
      <Stack.Screen name="PasswordManager" component={PasswordManagerScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="PaymentMethodSelect" component={PaymentMethodSelectScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
      <Stack.Screen name="PaymentReview" component={PaymentReviewScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <Stack.Screen name="Doctors" component={DoctorsScreen} />
      <Stack.Screen name="DoctorInfo" component={DoctorInfoScreen} />
      <Stack.Screen name="Rating" component={RatingScreen} />
      <Stack.Screen name="FavoriteServices" component={FavoriteServicesScreen} />
      <Stack.Screen name="FemaleDoctors" component={FemaleDoctorsScreen} />
      <Stack.Screen name="MaleDoctors" component={MaleDoctorsScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="AllAppointment" component={AllAppointmentScreen} />
      <Stack.Screen name="CancelAppointment" component={CancelAppointmentScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
};

export default AppRoute;
