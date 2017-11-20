/**
 * Simple hovering info modal that displays a title and a paragraph text
 * and can be closed.
 *
 * @prop style            - style override
 * @prop veteran          - veteran object that sent the friend request
 * @prop onClose          - callback executed when modal is closed
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import { colors } from '../styles/colors';
import Animations from '../styles/animations';
import Button from '../components/Button';

export default class FriendRequestModal extends React.Component {

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
        <Text style={styles.title}>{`NEW FRIEND REQUEST`}</Text>
        <View style={styles.nameImageContainer}>
          <Image
            source={require('../../assets/images/photogenic.jpg')}
            style={styles.image}
          />
          <Text style={styles.name}>{this.props.veteran.name}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={[buttonStyle, margins.marginTop.md]}
            textStyle={styles.acceptButton}
            text="ACCEPT"
          />
          <Button
            style={[buttonStyle, margins.marginTop.md]}
            textStyle={styles.rejectButton}
            text="REJECT"
            disabled={true}
          />
        </View>
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
    padding: 20,
    borderRadius: 4,
    backgroundColor: colors.light_snow,
    shadowColor: colors.charcoal,
    shadowOpacity: 0.15,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 15,
    zIndex: 100,
  },
  nameImageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    color: colors.green,
    backgroundColor: 'transparent',
    fontSize: 18,
    fontFamily: 'source-sans-pro-bold',
    letterSpacing: 0.5,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  name: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: 'source-sans-pro-bold',
  },
  bodyText: {
    color: colors.charcoal,
    backgroundColor: 'transparent',
    fontSize: 16,
    fontFamily: 'source-sans-pro-regular'
  },
  acceptButton: {
    height: 25,
    borderRadius: 12.5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
    backgroundColor: colors.green,
  },
  rejectButton: {
    height: 25,
    borderRadius: 12.5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
    backgroundColor: colors.red,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
