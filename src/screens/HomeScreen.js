import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={layoutStyles.flexCenter}>
        <Text>This is the Home screen!</Text>
      </View>
    );
  }
  
}
