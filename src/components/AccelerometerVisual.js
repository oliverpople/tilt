import React from "react";
import { Text, View } from "react-native";
import ProgressCircle from "react-native-progress-circle";

const AccelerometerVisual = ({ value }) => {
  return (
    <View style={styles.valueContainer}>
      <ProgressCircle
        percent={value * 1.111}
        radius={150}
        borderWidth={12}
        color="#3399FF"
        shadowColor="white"
        bgColor="#2F4F4F"
      >
        <Text style={styles.progressCircleText}>
          {new String(value).substr(0, 4)}°
        </Text>
      </ProgressCircle>
    </View>
  );
};

const styles = {
  valueContainer: {
    flexDirection: "column",
    flexWrap: "wrap"
  },
  progressCircleText: {
    fontSize: 75,
    color: "white"
  }
};

export default AccelerometerVisual;
