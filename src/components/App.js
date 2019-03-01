import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { accelerometerObservable } from "../accelerometerObservable.js";
import SystemSetting from "react-native-system-setting";
import Header from "./Header.js";
import Card from "./Card.js";
import Button from "./Button.js";
import CardSection from "./CardSection.js";

const Value = ({ name, value }) => (
  <View style={styles.valueContainer}>
    <Text style={styles.valueName}>{name}:</Text>
    <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
  </View>
);

export default class App extends Component {
  constructor(props) {
    super(props);

    SystemSetting.saveBrightness();

    this.getAccelerometerData(accelerometerObservable);

    this.state = { z: 0, status: "On" };
  }

  async getAccelerometerData(accelerometerObs) {
    const accelerometer = await accelerometerObs();

    accelerometer.subscribe(({ z }) => {
      this.setState({ z }),
        error => {
          console.log("The sensor is not available");
        };
    });
  }

  turnOnOffScreenBrightnessSetter() {
    if (this.state.status === "On") {
      SystemSetting.restoreBrightness();
      this.setState({ status: "Off" });
    } else {
      this.setState({ status: "On" });
    }
  }

  setScreenBrightness() {
    if (this.state.status === "Off") {
      const { z } = this.state;
      SystemSetting.setAppBrightness(1 + z);
    }
  }

  render() {
    const { z } = this.state;
    const { container, headline } = styles;

    return (
      <View style={container}>
        <Header headerText="Tilt" />
        <Card>
          <CardSection>
            <Button onPress={() => this.turnOnOffScreenBrightnessSetter()}>
              Turn Tilt {this.state.status}
            </Button>
          </CardSection>
          <CardSection>
            <Text style={headline}>Accelerometer values</Text>
            <Value name="z" value={z} />
          </CardSection>
        </Card>
        {this.setScreenBrightness()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
