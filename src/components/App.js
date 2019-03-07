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

      SystemSetting.setAppBrightness(1 + z);
    }
  }

  render() {
    const { z } = this.state;
    const degrees = z * -90;
    const { container, headline } = styles;

    return (
      <View style={container}>
        <Card>
          <CardSection>
            <Text style={styles.headline}>Current tilt:</Text>
          </CardSection>
          <CardSection>
            <AccelerometerVisual value={degrees} />
          </CardSection>
          <CardSection>
            <Button onPress={() => this.turnOnOffScreenBrightnessSetter()}>
              Turn Tilt {this.state.status}
            </Button>
          </CardSection>
        </Card>
        {this.setScreenBrightness()}
      </View>
    );
  }
}

const styles = {
  headline: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: "white"
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  }
};
