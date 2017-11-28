import React from 'react';
import { StackNavigator } from 'react-navigation';
import ConnectScreen from '../screens/ConnectScreen';
import ConnectSignUpScreen from '../screens/ConnectSignUpScreen';
import ProfileScreen from '../screens/ProfileScreen';


const ConnectSignUpStackNavigator = StackNavigator({
  Connect: {
    screen: ConnectScreen,
  },
  ConnectSignUp: {
    screen: ConnectSignUpScreen,
  },
  ConnectProfile: {
    screen: ProfileScreen,
  },
}, {
  initialRouteName: 'Connect',
  headerMode: 'none',
});

export default ConnectSignUpStackNavigator;
