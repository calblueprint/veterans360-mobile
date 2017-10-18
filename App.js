import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
registerScreens();

export default class App extends React.Component {
  render() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'One',
          screen: 'test.TestScreen', // this is a registered name for a screen
          title: 'Screen One'
        }
      ]
    });
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
