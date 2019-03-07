import React from "react";
import { View } from "react-native";

const Card = props => {
  return <View style={styles.containerStyles}>{props.children}</View>;
};

const styles = {
  containerStyles: {
    backgroundColor: "#2F4F4F",
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffSet: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flex: 1
  }
};

export default Card;
