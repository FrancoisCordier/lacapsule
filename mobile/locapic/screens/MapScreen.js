import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Overlay, Text, Input, Divider } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { connect } from "react-redux";

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
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [addPOI, setAddPOI] = useState(false);
  const [listPOI, setListPOI] = useState([]);
  const [userPin, setUserPin] = useState(null);
  const [dataPOI, setDataPOI] = useState({ name: "", description: "" });
  const [visible, setVisible] = useState(false);

  console.log(props.state);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    async function askPermissions() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setLocation(location);
        });
      }
    }
    askPermissions();
  }, []);

  const addPointOfInterest = () => {
    props.addPOI({
      latitude: userPin.latitude,
      longitude: userPin.longitude,
      name: dataPOI.name,
      description: dataPOI.description,
    });

    setListPOI([
      ...listPOI,
      {
        latitude: userPin.latitude,
        longitude: userPin.longitude,
        name: dataPOI.name,
        description: dataPOI.description,
      },
    ]);
    setAddPOI(false);
    setDataPOI({ name: "", description: "" });
    setUserPin(null);
    toggleOverlay();
    console.log(listPOI);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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
        {location ? (
          <Marker
            title="Hello"
            description="I am here"
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        ) : null}
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
              console.log(dataPOI);
            }}
          />
          <Input
            label="Description"
            onChangeText={(description) => {
              setDataPOI({ name: dataPOI.name, description: description });
              console.log(dataPOI);
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
