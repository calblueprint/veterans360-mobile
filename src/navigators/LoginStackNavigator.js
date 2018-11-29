import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const LoginStackNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Signup: {
      screen: SignupScreen
    },
    App: {
      screen: MainTabNavigator
    }
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default createAppContainer(LoginStackNavigator);
