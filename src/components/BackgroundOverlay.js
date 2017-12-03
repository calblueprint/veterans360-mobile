/**
 * Basic background display component that displays a rotated green
 * and white background. Use this as a wrapper container for the rest
 * of the components on the page.
 *
 * @prop children     - elements contained in this container
 * @prop bottom       - bottom percentage style
 * @prop color        - color value of the background
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import { colors } from '../styles/colors';

export default class BackgroundOverlay extends React.Component {

  getOverlayStyle() {
    let propStyles = {};
    if (!!this.props.bottom) {
      propStyles.bottom = this.props.bottom;
    }
    if (!!this.props.color) {
      propStyles.backgroundColor = this.props.color;
    }
    return [styles.rotatedContainer, propStyles]
  }

  render() {
    return (
      <View style={[styles.baseContainer, this.props.style]}>
        <View style={this.getOverlayStyle()} />
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.snow,
  },
  rotatedContainer: {
    position: 'absolute',
    height: '100%',
    width: '200%',
    bottom: '50%',
    transform: [{rotate: '-16deg'}],
    backgroundColor: colors.green,
  },
});
