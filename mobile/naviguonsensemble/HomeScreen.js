import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9b59b6",
    alignItems: "center",
    justifyContent: "center",
  },
});

const HomeScreen = () => {
  return <View style={styles.container}></View>;
};

export default HomeScreen;
