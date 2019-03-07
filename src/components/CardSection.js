import React from "react";
import { View } from "react-native";

const CardSection = props => {
  return <View style={style.containerStyle}>{props.children}</View>;
};

const style = {
  containerStyle: {
    backgroundColor: "#2F4F4F",
    padding: 5,
    justifyContent: "center",
    flexDirection: "row",
    position: "relative"
  }
};

export default CardSection;
