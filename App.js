import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
<<<<<<< HEAD
import LoginStackNavigator from './src/navigators/LoginStackNavigator';
import { loadFonts } from './src/styles/fonts';

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
      <LoginStackNavigator />
    ) : null;
  }
}
