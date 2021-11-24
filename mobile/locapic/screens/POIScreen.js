import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Button, Input, Avatar, Icon } from "react-native-elements";
import { connect } from "react-redux";

const POIScreen = (props) => {
  console.log(props.pointOfInterests);
  return (
    <View style={{ marginTop: 50 }}>
      {props.pointOfInterests.map((el, index) => {
        return (
          <ListItem
            key={index}
            bottomDivider
            onPress={() => props.removePOI(el)}
          >
            <ListItem.Content>
              <ListItem.Title>{el.name}</ListItem.Title>
              <ListItem.Subtitle>{el.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { pointOfInterests: state.pointOfInterests };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePOI: (pointOfInterest) => {
      dispatch({ type: "removePOI", name: pointOfInterest.name });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(POIScreen);
