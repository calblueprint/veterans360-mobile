import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TestScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Test',
  };

  render() {
    return (
      <View>
        <Text>
          This is a test screen!
        </Text>
      </View>
    )
  }
}
