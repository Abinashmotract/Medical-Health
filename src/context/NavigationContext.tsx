import React, { createContext, useContext, useState, ReactNode } from "react";
import { NavigationState } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppRoute";

type NavigationContextType = {
  currentRoute: keyof RootStackParamList;
  setCurrentRoute: (route: keyof RootStackParamList) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<keyof RootStackParamList>("Splash");

  return (
    <NavigationContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationContext must be used within NavigationProvider");
  }
  return context;
};

