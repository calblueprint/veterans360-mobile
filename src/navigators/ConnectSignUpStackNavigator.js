/**
 * Navigator stack that controls the Connect and Connect Sign Up flow
 * to ensure that the user doesn't see the Connect screen until the
 * Connect sign up process has concluded.
 */

import React from "react";
import { createStackNavigator } from "react-navigation";
import ConnectScreen from "../screens/ConnectScreen";
import ConnectSignUpScreen from "../screens/ConnectSignUpScreen";
import ProfileScreen from "../screens/ProfileScreen";

const ConnectSignUpStackNavigator = createStackNavigator(
  {
    Connect: {
      screen: ConnectScreen
    },
    ConnectSignUp: {
      screen: ConnectSignUpScreen
    },
    ConnectProfile: {
      screen: ProfileScreen
    }
  },
  {
    initialRouteName: "Connect",
    headerMode: "none"
  }
);

export default ConnectSignUpStackNavigator;
