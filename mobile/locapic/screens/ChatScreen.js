import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
import { ListItem, Button, Input, Icon } from "react-native-elements";
import { io } from "socket.io-client";
import { connect } from "react-redux";

const socket = io("http://192.168.1.65:3000");

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

const ChatScreen = (props) => {
  const [currentMessage, setCurrentMessage] = useState({
    user: props.state.pseudo,
    content: "",
  });
  const [listMessages, setListMessages] = useState([]);

  const sendMessage = () => {
    socket.emit("sendMessage", currentMessage);
    setCurrentMessage("");
  };

  useEffect(() => {
    const listener = (message) => {
      setListMessages([...listMessages, message]);
    };
    socket.on("sendMessageToAll", listener);
    console.log(listMessages);
    return () => socket.off("sendMessageToAll", listener);
  }, [listMessages]);

  return (
    <View style={styles.container}>
      <View style={styles.chat}>
        <ScrollView>
          {listMessages.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.content}</ListItem.Title>
                <ListItem.Subtitle>{item.user}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </View>
      <View>
        <Input
          placeholder="Your message"
          value={currentMessage.content}
          onChangeText={(message) =>
            setCurrentMessage({ user: props.state.pseudo, content: message })
          }
        />
        <Button
          icon={
            <Icon type="ionicon" name="mail-outline" size={15} color="white" />
          }
          title="Send"
          onPress={() => sendMessage()}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { state };
};
export default connect(mapStateToProps, null)(ChatScreen);
