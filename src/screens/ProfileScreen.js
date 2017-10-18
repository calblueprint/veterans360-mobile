import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';

export default class ProfileScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={22} color="#e91e63" />
    ),
  };

  render() {
    return (
      <View style={layoutStyles.flexCenter}>
        <Text>This is the Profile screen!</Text>
      </View>
    );
  }
}
