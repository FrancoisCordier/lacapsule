import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button, Text } from "react-native-elements";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    marginTop: 30,
    alignItems: "center",
    // width: "50%",
    borderRadius: 5,
  },
});

const HomeScreen = (props) => {
  const [pseudo, setPseudo] = useState("");

  useEffect(() => {
    getPseudo();
  }, []);

  const storePseudo = async (pseudo) => {
    try {
      await AsyncStorage.setItem("pseudo", pseudo);
      props.setPseudo(pseudo);
    } catch (e) {
      console.log(e);
    }
  };

  const getPseudo = async () => {
    try {
      const pseudo = await AsyncStorage.getItem("pseudo");
      if (pseudo) {
        setPseudo(pseudo);
        props.setPseudo(pseudo);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("./home.jpg")} style={styles.image}>
        {!props.state.pseudo ? (
          <Input
            containerStyle={{ width: "75%" }}
            inputContainerStyle={{ borderColor: "red" }}
            inputStyle={{ color: "black" }}
            placeholder="Username"
            leftIcon={<Icon name="user" size={24} color="red" />}
            onChangeText={(pseudo) => setPseudo(pseudo)}
          />
        ) : (
          <Text h4 h4Style={{ color: "white" }}>
            Welcome back {pseudo} !
          </Text>
        )}
        <Button
          icon={<Icon name="arrow-right" size={15} color="red" />}
          title="Go to map"
          onPress={() => {
            storePseudo(pseudo);
            props.navigation.navigate("TabNav");
          }}
          buttonStyle={styles.button}
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

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
