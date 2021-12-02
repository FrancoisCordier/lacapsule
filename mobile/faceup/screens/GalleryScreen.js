import React from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Stack,
  FlatList,
  Flex,
  Badge,
  Text,
  HStack,
} from "native-base";
import { connect } from "react-redux";

const GalleryScreen = (props) => {
  console.log("STATE", props.state);

  const cards = (
    <FlatList
      data={props.state.photos}
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
                  uri: item.photoURL,
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
            <Box>
              {item.detectionResults ? (
                item.detectionResults.map((el, index) => {
                  return (
                    <Flex direction="row" wrap="wrap" key={index}>
                      <Badge colorScheme="info">{`${el.age} y.o`}</Badge>
                      <Badge colorScheme="info">{el.gender}</Badge>
                    </Flex>
                  );
                })
              ) : (
                <Text>{item.detectionError}</Text>
              )}
            </Box>
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

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, null)(GalleryScreen);
