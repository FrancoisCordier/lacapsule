import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const MapScreen = (props) => {
  console.log(props.state);
  return (
    <View style={styles.container}>
      <Text>Hello {props.state.pseudo}</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, null)(MapScreen);
