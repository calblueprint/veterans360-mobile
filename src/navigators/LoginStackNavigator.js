import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';


const LoginStackNavigator = StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Signup: {
    screen: SignupScreen,
  },
  App: {
    screen: MainTabNavigator,
  },
}, {
  initialRouteName: 'Login',
  headerMode: 'none', 
});

export default LoginStackNavigator;
