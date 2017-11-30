/**
 * Simple hovering info modal that displays a title and a paragraph text
 * and can be closed.
 *
 * @prop style            - style override
 * @prop title            - title text
 * @prop text             - body text
 * @prop onClose          - callback executed when modal is closed
 */

import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { colors } from '../styles/colors';
import Animations from '../styles/animations';

export default class InfoModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      helpAnimationValue: new Animated.Value(0),
    };

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    Animations.fade(this.state.helpAnimationValue, toValue = 1).start();
  }

  closeModal() {
    Animations.fade(this.state.helpAnimationValue).start(() => {
      this.props.onClose();
    });
  }

  getHelpAnimationStyle() {
    return {
      opacity: this.state.helpAnimationValue,
      transform: [{
        translateY: this.state.helpAnimationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      }],
    };
  }

  render() {
    return (
      <Animated.View
        style={[styles.baseContainer, this.getHelpAnimationStyle()]}
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

InfoModal.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

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
    marginTop: 5,
    marginBottom: 5,
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
    fontSize: 18,
    fontFamily: 'source-sans-pro-bold',
    letterSpacing: 0.5,
  },
  bodyText: {
    color: colors.charcoal,
    backgroundColor: 'transparent',
    fontSize: 16,
    fontFamily: 'source-sans-pro-regular'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
