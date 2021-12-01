import React, { useState, useEffect, useRef } from "react";
import { Box, Text, Button, HStack, Icon } from "native-base";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SnapScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Box flex={1}>
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
      <Button
        onPress={async () => {
          if (cameraRef) {
            let photo = await cameraRef.takePictureAsync({
              quality: 0.7,
              base64: true,
              exif: true,
            });

            console.log(photo.uri);
          }
        }}
      >
        Snap
      </Button>
    </Box>
  );
};

export default SnapScreen;
