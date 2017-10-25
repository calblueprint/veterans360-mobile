import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import BackgroundOverlay from '../components/BackgroundOverlay';
import RaisedContainer from '../components/RaisedContainer';

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Connect',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="users" size={20} color="#e91e63" />
    ),
  };

  render() {
    return (
      <BackgroundOverlay>
        <RaisedContainer style={styles.raisedContainer}>
          <Text>Hello</Text>
        </RaisedContainer>
      </BackgroundOverlay>
    );
  }
}

const styles = StyleSheet.create({
  raisedContainer: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    width: '80%',
    height: '40%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
