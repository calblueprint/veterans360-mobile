import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';

export default class ProfileScreen extends React.Component {

  render() {
    return (
      <View style={layoutStyles.flexCenter}>
        <Text>This is the Profile screen!</Text>
      </View>
    );
  }
  
}
