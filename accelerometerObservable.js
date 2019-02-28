import {
  setUpdateIntervalForType,
  SensorTypes,
  accelerometer
} from "react-native-sensors";

export async function accelerometerData() {
  setUpdateIntervalForType(SensorTypes.accelerometer, 150);

  return accelerometer;
}
