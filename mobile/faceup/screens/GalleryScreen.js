import React from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  FlatList,
  Container,
  Flex,
  Badge,
} from "native-base";
import { Asset } from "expo-asset";
import image01 from "../assets/picture-1.jpg";
import image02 from "../assets/picture-2.jpg";
import image03 from "../assets/picture-3.jpg";
import image04 from "../assets/picture-4.jpg";

const GalleryScreen = () => {
  const data = [
    { img: image01 },
    { img: image02 },
    { img: image03 },
    { img: image04 },
  ];

  const cards = (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
          mb="3"
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: Asset.fromModule(item.img).uri,
                }}
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                Tags determined by AI
              </Heading>
            </Stack>
            <Flex direction="row" wrap="wrap">
              <Badge colorScheme="success">SUCCESS</Badge>
              <Badge colorScheme="success">SUCCESS</Badge>
              <Badge colorScheme="success">SUCCESS</Badge>
              <Badge colorScheme="success">SUCCESS</Badge>
              <Badge colorScheme="success">SUCCESS</Badge>
              <Badge colorScheme="success">SUCCESS</Badge>
              <Badge colorScheme="success">SUCCESS</Badge>
            </Flex>
          </Stack>
        </Box>
      )}
      keyExtractor={(item, index) => `list-item-${index}`}
    />
  );

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      flex={1}
      alignItems="center"
    >
      <Heading p={5}>John's gallery</Heading>
      {cards}
    </Box>
  );
};

export default GalleryScreen;
