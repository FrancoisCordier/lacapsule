import React, { useState } from "react";
import {
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  VStack,
  Button,
  Input,
  Icon,
  StatusBar,
} from "native-base";
import NativeBaseIcon from "../components/NativeBaseIcon";
import { MaterialIcons } from "@expo/vector-icons";

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
      <StatusBar
        barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorMode === "dark" ? "#0f172a" : "#f8fafc"}
      />
    </HStack>
  );
}

const Home = (props) => {
  const [pseudo, setPseudo] = useState("");
  console.log(pseudo);

  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <NativeBaseIcon />
        <Heading size="lg">Welcome to This.cord</Heading>
        <HStack space={2} alignItems="center">
          <Input
            type="text"
            py="0"
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
            InputRightElement={
              <Button
                rounded="none"
                h="full"
                w="1/5"
                onPress={() => props.navigation.navigate("Chat")}
              >
                Go
              </Button>
            }
            placeholder="Name"
            value={pseudo}
            onChangeText={(pseudo) => setPseudo(pseudo)}
          />
        </HStack>
        <ToggleDarkMode />
      </VStack>
    </Center>
  );
};

export default Home;
