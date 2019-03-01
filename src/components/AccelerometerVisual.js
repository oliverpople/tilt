import React from "react";
import { Text, View } from "react-native";

const AccelerometerVisual = ({ value, title }) => {
  return (
    <View style={styles.valueContainer}>
      <Text style={styles.headline}>{title}</Text>
      <Text style={styles.valueValue}>{new String(value).substr(0, 4)}º</Text>
    </View>
  );
};

const styles = {
  headline: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  valueContainer: {
    flexDirection: "column",
    flexWrap: "wrap"
  },
  valueValue: {
    fontSize: 120,
    textAlign: "center"
  }
};

export default AccelerometerVisual;
