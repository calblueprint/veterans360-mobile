import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';

export default class ConnectScreen extends React.Component {

  navigateToSignUp() {
    this.props.navigation.navigate('ConnectSignUp', this.props.navigation.state.params);
  }

  render() {
    return (
      <View style={layoutStyles.flexCenter}>
        <Text>This is the Connect screen!</Text>
        <TouchableHighlight onPress={ () => { this.navigateToSignUp(); } }>
          <Text>Navigate to connect sign up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
