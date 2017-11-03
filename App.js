import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import ConnectScreen from './src/screens/ConnectScreen';
import VaultScreen from './src/screens/VaultScreen';
import ResponseScreen from './src/screens/ResponseScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import { Font } from 'expo';
import { loadFonts } from './src/styles/fonts';

const Navigator = TabNavigator({
  Login: {
    screen: LoginScreen,
  },
  Connect: {
    screen: ConnectScreen,
  },
  Vault: {
    screen: VaultScreen,
  },
  Response: {
    screen: ResponseScreen,
  },
  Profile: {
    screen: ProfileScreen,
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  }
});

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false, 
    };
  }

  componentDidMount() {
    loadFonts().then(() => {
      this.setState({ fontsLoaded: true });
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    return this.state.fontsLoaded ? (
      <Navigator />
    ) : null;
  }
}