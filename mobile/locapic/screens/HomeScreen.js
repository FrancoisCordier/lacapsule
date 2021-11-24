import React, { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    width: "50%",
    borderRadius: 5,
  },
});

const HomeScreen = (props) => {
  const [pseudo, setPseudo] = useState("");
  console.log(pseudo);
  return (
    <View style={styles.container}>
      <ImageBackground source={require("./home.jpg")} style={styles.image}>
        <Input
          containerStyle={{ width: "75%" }}
          inputContainerStyle={{ borderColor: "red" }}
          inputStyle={{ color: "black" }}
          placeholder="Username"
          leftIcon={<Icon name="user" size={24} color="red" />}
          onChangeText={(pseudo) => setPseudo(pseudo)}
        />
        <Button
          icon={<Icon name="arrow-right" size={15} color="red" />}
          title="Go to map"
          onPress={() => {
            props.setPseudo(pseudo);
            props.navigation.navigate("TabNav");
          }}
        />
      </ImageBackground>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPseudo: (pseudo) => {
      dispatch({ type: "savePseudo", pseudo });
    },
  };
};

export default connect(null, mapDispatchToProps)(HomeScreen);
