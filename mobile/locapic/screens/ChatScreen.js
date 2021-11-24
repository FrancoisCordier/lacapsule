import React from "react";
import { StyleSheet, View, Text } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
import { ListItem, Button, Input, Avatar, Icon } from "react-native-elements";

const list = [
  {
    title: "Coucou ça va ?",
    author: "John",
  },
  {
    title: "Mortel et toi ?",
    author: "Jess",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ffff",
    marginTop: 50,
    // alignItems: "center",
    // justifyContent: "center",
  },
  chat: {
    flex: 1,
  },
});

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chat}>
        {list.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.author}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <View>
        <Input placeholder="Your message" />
        <Button
          icon={
            <Icon type="ionicon" name="mail-outline" size={15} color="white" />
          }
          title="Send"
        />
      </View>
    </View>
  );
};

export default ChatScreen;
