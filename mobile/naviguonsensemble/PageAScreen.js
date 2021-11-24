import React from "react";
import { StyleSheet, View, Button } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
  },
});

const PageAScreen = (props) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to page B"
        onPress={() => props.navigation.navigate("PageB")}
      ></Button>
    </View>
  );
};

export default PageAScreen;
