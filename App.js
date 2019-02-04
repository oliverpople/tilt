import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  setUpdateIntervalForType,
  SensorTypes,
  accelerometer
} from "react-native-sensors";
import SystemSetting from "react-native-system-setting";

const Value = ({ name, value }) => (
  <View style={styles.valueContainer}>
    <Text style={styles.valueName}>{name}:</Text>
    <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
  </View>
);

export default class App extends Component {
  constructor(props) {
    super(props);

    setUpdateIntervalForType(SensorTypes.accelerometer, 150);

    accelerometer.subscribe(({ x, y, z }) => {
      this.setState({ x, y, z }),
        error => {
          console.log("The sensor is not available");
        };
    });

    this.state = { x: 0, y: 0, z: 0 };
  }

  setScreenBrightness() {
    const { z } = this.state;
    SystemSetting.setAppBrightness(1 + z);
  }

  render() {
    const { x, y, z } = this.state;
    const { container, headline } = styles;

    return (
      <View style={container}>
        <Text style={headline}>Accelerometer values</Text>
        <Value name="x" value={x} />
        <Value name="y" value={y} />
        <Value name="z" value={z} />
        {this.setScreenBrightness()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  headline: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  valueContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  valueValue: {
    width: 200,
    fontSize: 20
  },
  valueName: {
    width: 50,
    fontSize: 20,
    fontWeight: "bold"
  }
});
