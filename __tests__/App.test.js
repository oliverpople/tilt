import "react-native";
import React from "react";
import App from "../App";
import { shallow } from "enzyme";
import Enzyme from "enzyme"; // remove repitition
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-native-sensors", () => {
  return {
    accelerometerObservable: jest.fn()
  };
});
jest.mock("react-native-system-setting", () => {
  return {
    SystemSetting: {},
    setAppBrightness: jest.fn()
  };
});

describe("App component", () => {
  it("renders", () => {
    renderer.create(<App />);
  });

  it("calls a function for getting accelerometer data", () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    jest.spyOn(instance, "getAccelerometerData");
    expect(instance.getAccelerometerData).toBeDefined();
    instance.getAccelerometerData();
    expect(instance.getAccelerometerData).toHaveBeenCalled();
  });
});
