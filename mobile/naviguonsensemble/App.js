import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen";
import PageAScreen from "./PageAScreen";
import PageBScreen from "./PageBScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PageB"
        component={PageBScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PageA"
        component={PageAScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Stack") {
              iconName = focused ? "ios-heart" : "ios-heart-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stack" component={StackNav} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
