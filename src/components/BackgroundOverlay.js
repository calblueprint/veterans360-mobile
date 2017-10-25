import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import { colors } from '../styles/colors';

export default class BackgroundOverlay extends React.Component {

  render() {
    return (
      <View style={styles.baseContainer}>
        <View style={styles.rotatedContainer} />
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
  }
});
