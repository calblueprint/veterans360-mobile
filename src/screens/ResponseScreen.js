import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';

export default class ResponseScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Response',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="file-o" size={21} color="#e91e63" />
    ),
  };

  render() {
    return (
      <View style={layoutStyles.flexCenter}>
        <Text>This is the Response screen!</Text>
      </View>
    );
  }
}
