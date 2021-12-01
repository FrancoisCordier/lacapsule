import React, { useState } from "react";
import {
  Text,
  HStack,
  Center,
  Switch,
  useColorMode,
  extendTheme,
  VStack,
  Input,
  Icon,
  StatusBar,
  Button,
} from "native-base";
import { ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

const HomeScreen = ({ navigation }) => {
  const [pseudo, setPseudo] = useState("");
  return (
    <ImageBackground
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      source={require("../assets/home.jpg")}
    >
      <Center
        // _dark={{ bg: "blueGray.900" }}
        // _light={{ bg: "blueGray.50" }}
        px="3"
        flex={1}
      >
        <StatusBar />
        {/* <VStack space={5} alignItems="center">
        <NativeBaseIcon />
        <Heading size="lg">Welcome to NativeBase</Heading>
        <HStack space={2} alignItems="center">
          <Text>Edit</Text>
          <Code>App.js</Code>
          <Text>and save to reload.</Text>
        </HStack>
        <Link href="https://docs.nativebase.io" isExternal>
          <Text color="primary.500" underline fontSize={"xl"}>
            Learn NativeBase
          </Text>
        </Link>
        <ToggleDarkMode />
      </VStack> */}
        <VStack space={4} w="80%" alignItems="center">
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Name"
            onChangeText={(pseudo) => setPseudo(pseudo)}
          />
          <Button
            onPress={() => navigation.navigate("bottomNav")}
            value={pseudo}
          >
            Go to gallery
          </Button>
        </VStack>
      </Center>
    </ImageBackground>
  );
};

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

export default HomeScreen;
