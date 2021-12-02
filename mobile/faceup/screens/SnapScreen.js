import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  Modal,
  Spinner,
  Heading,
} from "native-base";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/core";
import { connect } from "react-redux";

const axios = require("axios").default;

const SnapScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [showModal, setShowModal] = useState(false);
  const isFocused = useIsFocused();
  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  let cameraDisplay;
  if (hasPermission && isFocused) {
    cameraDisplay = (
      <Camera
        style={{ flex: 1, justifyContent: "flex-end" }}
        type={type}
        ratio="16:9"
        ref={(ref) => (cameraRef = ref)}
        flashMode={flash}
      >
        <HStack
          _text={{
            color: "white",
          }}
        >
          <Button.Group mb="3">
            <Button
              variant="unstyled"
              leftIcon={
                <Icon
                  as={MaterialIcons}
                  name="flip-camera-ios"
                  size="sm"
                  color="white"
                />
              }
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            ></Button>
            <Button
              leftIcon={
                flash === Camera.Constants.FlashMode.off ? (
                  <Icon
                    as={Ionicons}
                    name="flash-off"
                    size="sm"
                    color="white"
                  />
                ) : (
                  <Icon as={Ionicons} name="flash" size="sm" color="white" />
                )
              }
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.off
                );
              }}
              variant="unstyled"
            ></Button>
          </Button.Group>
        </HStack>
      </Camera>
    );
  } else {
    cameraDisplay = <Box flex={1}></Box>;
  }

  return (
    <Box flex={1}>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="sm">
        <Modal.Content>
          <Modal.Body>
            <HStack space={2} alignItems="center" justifyContent="center">
              <Spinner accessibilityLabel="Loading posts" />
              <Heading color="primary.500" fontSize="md">
                Loading
              </Heading>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {cameraDisplay}
      <Button
        onPress={async () => {
          setShowModal(true);
          if (cameraRef) {
            let photo = await cameraRef.takePictureAsync({
              quality: 0.7,
              base64: true,
              exif: true,
            });

            const data = new FormData();

            data.append("photo", {
              uri: photo.uri,
              type: "image/jpeg",
              name: "photo.jpg",
            });

            axios
              .post("http://192.168.1.65:3000/upload", data)
              .then((res) => {
                console.log("RESPONSE FROM BACK", res.data);
                if (res.data.detectionResults) {
                  props.addPhoto({
                    photoURL: res.data.photoURL,
                    detectionResults: res.data.detectionResults,
                  });
                } else {
                  props.addPhoto({
                    photoURL: res.data.photoURL,
                    detectionError: res.data.detectionError,
                  });
                }

                setShowModal(false);
              })
              .catch((e) => console.log(e));
          }
        }}
      >
        Snap
      </Button>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPhoto: (photoURL) => {
      dispatch({ type: "addPhoto", photoURL });
    },
  };
};

export default connect(null, mapDispatchToProps)(SnapScreen);
