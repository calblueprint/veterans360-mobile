import React, { Component } from 'react';
import { Font } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import ConnectScreen from './src/screens/ConnectScreen';
import VaultScreen from './src/screens/VaultScreen';
import ResponseScreen from './src/screens/ResponseScreen';
import ProfileScreen from './src/screens/ProfileScreen';


const Navigator = TabNavigator({
  Home: {
    screen: HomeScreen,
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
  async componentDidMount() {
    await Font.loadAsync({
      'source-sans-pro-black': require('./assets/fonts/SourceSansPro-Black.ttf'),
      'source-sans-pro-black-italic': require('./assets/fonts/SourceSansPro-BlackItalic.ttf'),
      'source-sans-pro-bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
      'source-sans-pro-bold-italic': require('./assets/fonts/SourceSansPro-BoldItalic.ttf'),
      'source-sans-pro-extra-light': require('./assets/fonts/SourceSansPro-ExtraLight.ttf'),
      'source-sans-pro-extra-light-italic': require('./assets/fonts/SourceSansPro-ExtraLightItalic.ttf'),
      'source-sans-pro-italic': require('./assets/fonts/SourceSansPro-Italic.ttf'),
      'source-sans-pro-light': require('./assets/fonts/SourceSansPro-Light.ttf'),
      'source-sans-pro-light-italic': require('./assets/fonts/SourceSansPro-LightItalic.ttf'),
      'source-sans-pro-regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
      'source-sans-pro-semibold': require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
      'source-sans-pro-semibold-italic': require('./assets/fonts/SourceSansPro-SemiBoldItalic.ttf'),
    });
    this.setState({fontLoaded: true});
  }
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  render() {
    return (
      <View>
        {
          this.state.fontLoaded? (
            <Navigator />
          ) : null
        }
      </View>
    );
  }
}