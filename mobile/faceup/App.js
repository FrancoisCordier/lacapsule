import React from "react";
import { NativeBaseProvider, extendTheme, StatusBar } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import SnapScreen from "./screens/SnapScreen";
import GalleryScreen from "./screens/GalleryScreen";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import photos from "./reducers/photos.reducer";

const store = createStore(combineReducers({ photos }));

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// Extend the theme
export const theme = extendTheme({ config });

// Create a stack and tab navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const bottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Gallery") {
            iconName = focused ? "images" : "images-outline";
          } else if (route.name === "Snap") {
            iconName = focused ? "camera" : "camera-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#002851" },
      })}
    >
      <Tab.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Snap"
        component={SnapScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="bottomNav"
              component={bottomNav}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
