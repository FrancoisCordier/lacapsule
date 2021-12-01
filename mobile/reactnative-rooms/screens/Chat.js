import React, { useState, useEffect } from "react";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  VStack,
  Text,
  Input,
} from "native-base";

const Chat = () => {
  const data = [
    {
      pseudo: "Aafreen Khan",
      message: "Good Day!",
    },
    {
      pseudo: "Aafreen Khan",
      message: "Good Day!",
    },
    {
      pseudo: "Aafreen Khan",
      message: "Good Day!",
    },
    {
      pseudo: "Aafreen Khan",
      message: "Good Day!",
    },
    {
      pseudo: "Aafreen Khan",
      message: "Good Day!",
    },
  ];

  return (
    <Box
      w={{
        base: "100%",
        md: "25%",
      }}
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      flex="1"
      safeAreaTop
    >
      <Heading fontSize="xl" p="4" pb="3">
        Inbox
      </Heading>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.pseudo}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.message}
                </Text>
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Input></Input>
    </Box>
  );
};

export default Chat;
