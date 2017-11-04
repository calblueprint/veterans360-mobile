/**
 * Connect Pin
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import { colors } from '../styles/colors';
import Animations from '../styles/animations';


export default class ConnectPin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <View
        style={[styles.baseContainer]}
      >
        <Image
          source={require('../../assets/images/pin.png')}
          style={styles.pin}
        />
        <Image
          source={require('../../assets/images/photogenic.jpg')}
          style={styles.image}
        />
      </View>
    );
  }
}

/* Change these as you see fit */
const properties = {
  pinHeight: 80,
  imageMargin: 4,
};

const styles = StyleSheet.create({
  baseContainer: {
    height: properties.pinHeight,
    width: properties.pinHeight * 0.75,
  },
  pin: {
    height: properties.pinHeight,
    width: properties.pinHeight * 0.75,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: properties.pinHeight * 0.75 - 2 * properties.imageMargin,
    height: properties.pinHeight * 0.75 - 2 * properties.imageMargin,
    margin: properties.imageMargin,
    borderRadius: 0.5 * (properties.pinHeight * 0.75 - 2 * properties.imageMargin),
    zIndex: 100,
  },
  title: {
    marginBottom: 10,
    color: colors.green,
    backgroundColor: 'transparent',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  bodyText: {
    color: colors.charcoal,
    backgroundColor: 'transparent',
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
