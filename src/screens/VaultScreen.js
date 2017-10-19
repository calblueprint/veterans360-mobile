import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';

export default class VaultScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Vault',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="briefcase" size={22} color="#e91e63" />
    ),
  };

  render() {
    return (
      <View style={layoutStyles.flexCenter}>
        <Text>This is the Vault screen!</Text>
      </View>
    );
  }
}
