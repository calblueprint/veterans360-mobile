/**
 * Simple info modal
 *
 * @prop style            - style override
 * @prop title            - title text
 * @prop text             - body text
 * @prop onClose          - callback executed when modal is closed
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import { colors } from '../styles/colors';
import Animations from '../styles/animations';

export default class InfoModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  closeModal() {
    Animations.fadeAnimation(this.state.opacity).start(() => {
      this.props.onClose();
    });
  }

  render() {
    return (
      <Animated.View
        style={[styles.baseContainer, { opacity: this.state.opacity }]}
      >
        <Icon
          name="times"
          size={18}
          color={colors.light_gray}
          style={styles.closeButton}
          onPress={this.closeModal}
        />
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.bodyText}>{this.props.text}</Text>
      </Animated.View>
    );
  }
}


const styles = StyleSheet.create({
  modal: {
    borderRadius: 4,
    backgroundColor: colors.light_snow,
    shadowColor: colors.charcoal,
    shadowOpacity: 0.15,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 15,
  },
  baseContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: 10,
    marginTop: 30,
    padding: 20,
    borderRadius: 4,
    backgroundColor: colors.light_snow,
    shadowColor: colors.charcoal,
    shadowOpacity: 0.15,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 15,
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
