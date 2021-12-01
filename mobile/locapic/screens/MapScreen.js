import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Overlay, Text, Input } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.65:3000");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ffff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    flex: 1,
  },
});

const MapScreen = (props) => {
  // const [locations, setLocations] = useState();
  const [addPOI, setAddPOI] = useState(false);
  const [userPin, setUserPin] = useState(null);
  const [dataPOI, setDataPOI] = useState({ name: "", description: "" });
  const [visible, setVisible] = useState(false);
  const [usersLocations, setUsersLocations] = useState([]);

  useEffect(() => {
    askPermissions();
    getPointOfInterests();
  }, []);

  useEffect(() => {
    storePointOfInterest();
  }, [props.state.pointOfInterests]);

  useEffect(() => {
    const listener = (usersLocations) => {
      setUsersLocations(usersLocations);
    };
    socket.on("sendLocationToAll", listener);
    return () => socket.off("sendLocationToAll", listener);
  }, [usersLocations]);

  console.log(usersLocations);

  const askPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
        socket.emit("sendLocation", {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          pseudo: props.state.pseudo,
        });
      });
    }
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const addPointOfInterest = () => {
    props.addPOI({
      latitude: userPin.latitude,
      longitude: userPin.longitude,
      name: dataPOI.name,
      description: dataPOI.description,
    });

    setAddPOI(false);
    setDataPOI({ name: "", description: "" });
    setUserPin(null);
    toggleOverlay();
  };

  const storePointOfInterest = async () => {
    try {
      await AsyncStorage.setItem(
        "pointOfInterests",
        JSON.stringify(props.state.pointOfInterests)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const getPointOfInterests = async () => {
    try {
      const data = await AsyncStorage.getItem("pointOfInterests");

      if (data) {
        props.state.pointOfInterests = JSON.parse(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => {
          setAddPOI(true);
          toggleOverlay();
          setUserPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        {props.state.pointOfInterests.map((el, index) => {
          return (
            <Marker
              key={index}
              pinColor="blue"
              title={el.name}
              description={el.description}
              coordinate={{
                latitude: el.latitude,
                longitude: el.longitude,
              }}
            />
          );
        })}

        {usersLocations.map((location, index) => {
          return (
            <Marker
              // pinColor="red"
              key={index}
              title={location.pseudo}
              description="I am here"
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          );
        })}

        {userPin ? (
          <Marker
            pinColor="red"
            coordinate={{
              latitude: userPin.latitude,
              longitude: userPin.longitude,
            }}
          />
        ) : null}
      </MapView>
      <View>
        <Overlay
          overlayStyle={{ width: "75%", justifyContent: "flex-end" }}
          isVisible={visible}
          onBackdropPress={toggleOverlay}
        >
          <Text h4>Add point of interest</Text>
          <Input
            label="Name"
            onChangeText={(name) => {
              setDataPOI({ name: name, description: dataPOI.description });
            }}
          />
          <Input
            label="Description"
            onChangeText={(description) => {
              setDataPOI({ name: dataPOI.name, description: description });
            }}
          />
          <Button
            title="Add POI"
            disabled={addPOI ? false : true}
            onPress={() => addPointOfInterest()}
          />
        </Overlay>
      </View>
      <View></View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPOI: (pointOfInterest) => {
      dispatch({ type: "addPOI", pointOfInterest });
    },
  };
};

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
