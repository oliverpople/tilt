import {
  setUpdateIntervalForType,
  SensorTypes,
  accelerometer
} from "react-native-sensors";

export async function accelerometerObservable() {
  setUpdateIntervalForType(SensorTypes.accelerometer, 150);

  return accelerometer;
}
