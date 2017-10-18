import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';

export default class ConnectScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Connect',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="users" size={20} color="#e91e63" />
    ),
  };

  render() {
    return (
      <View style={layoutStyles.flexCenter}>
        <Text>This is the Connect screen!</Text>
      </View>
    );
  }
}
