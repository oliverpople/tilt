import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { accelerometerObservable } from "../accelerometerObservable.js";
import SystemSetting from "react-native-system-setting";
import Header from "./Header.js";
import Card from "./Card.js";
import Button from "./Button.js";
import CardSection from "./CardSection.js";
import AccelerometerVisual from "./AccelerometerVisual.js";

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
      SystemSetting.setAppBrightness(1 - z / 10);
    }
  }

  render() {
    const { z } = this.state;
    const degrees = z * 9;
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
            <AccelerometerVisual title="Current tilt" value={degrees} />
          </CardSection>
        </Card>
        {this.setScreenBrightness()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white"
  }
};
