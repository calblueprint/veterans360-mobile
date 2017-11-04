import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import ConnectScreen from '../screens/ConnectScreen';
import ConnectSignUpScreen from '../screens/ConnectSignUpScreen';


const ConnectSignUpStackNavigator = StackNavigator({
  Connect: {
    screen: ConnectScreen,
  },
  ConnectSignUp: {
    screen: ConnectSignUpScreen,
  }
});
export default ConnectSignUpStackNavigator;