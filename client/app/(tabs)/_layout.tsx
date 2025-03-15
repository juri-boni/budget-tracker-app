// app/(tabs)/_layout.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import { Slot } from "expo-router";
// import { Categories } from "@/screens/Categories";
import Categories from "./categories";
import Dashboard from "./dashboard";
import Home from "./home";
import Menu from "./menu";
import Expenses from "./expenses";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // headerTitle: "Essential Budget",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#006D6F", // Colore di sfondo dell'header
        },
        headerTitleStyle: {
          color: "#fff", // Colore del titolo
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="categories"
        component={Categories}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="category" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="expenses"
        component={Expenses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="payments" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="menu"
        component={Menu}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
