import React from 'react';
import { StackNavigator } from 'react-navigation';
import ConnectScreen from '../screens/ConnectScreen';
import ConnectSignUpScreen from '../screens/ConnectSignUpScreen';


const ConnectSignUpStackNavigator = StackNavigator({
  Connect: {
    screen: ConnectScreen,
  },
  ConnectSignUp: {
    screen: ConnectSignUpScreen,
  },
});
export default ConnectSignUpStackNavigator;