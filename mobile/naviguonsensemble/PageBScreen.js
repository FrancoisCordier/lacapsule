import React from "react";
import { StyleSheet, View, Button } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1c40f",
    alignItems: "center",
    justifyContent: "center",
  },
});

const PageBScreen = (props) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to page A"
        onPress={() => props.navigation.navigate("PageA")}
      ></Button>
    </View>
  );
};

export default PageBScreen;
