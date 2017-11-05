/**
 * Connect Box component that renders an information box of
 * a user (either veteran or parter org) when their corresponding
 * pin is pressed.
 *
 * @prop connection       - either veteran or parter org object
 *                          (cannot think of a better name?!)
 *                          requires these properties:
 *                            - name
 *                            - roles
 *                            - image
 *                            - bio
 * @prop onClose          - callback to be executed when close button pressed
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';

import { colors } from '../styles/colors';
import { layoutStyles, margins } from '../styles/layout';
import Animations from '../styles/animations';
import Button from '../components/Button';

export default class ConnectBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      animationValue: new Animated.Value(0),

    };

    this.onBoxClose = this.onBoxClose.bind(this);
  }

  componentDidMount() {
    Animations.fade(this.state.animationValue, toValue = 1).start();
  }

  onBoxClose() {
    Animations.fade(this.state.animationValue).start(() => {
      this.props.onClose();
    });
  }

  getConnectionTitle() {
    return this.props.connection.roles ?
      this.props.connection.roles.join(', ') :
      'Partering Organization';
  }

  getAnimationStyle() {
    return {
      opacity: this.state.animationValue,
      transform: [{
        translateY: this.state.animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [200, 0],
        }),
      }],
    };
  }

  renderProfileImage() {
    if (this.props.connection.image) {
      return (
        <Image
          source={require(this.props.connection.image)}
          style={styles.profileImage}
        />
      );
    } else {
      return (
        <Image
          source={require('../../assets/images/photogenic.jpg')}
          style={styles.profileImage}
        />
      );
    }
  }

  renderCloseButton() {
    return (
      <Icon
        name="times"
        size={20}
        color={colors.light_gray}
        style={styles.closeButton}
        onPress={this.onBoxClose}
      />
    );
  }

  render() {
    return (
      <Animated.View
        style={[styles.baseContainer,
                this.getAnimationStyle(),
                this.props.style]}
      >
        <View style={styles.leftContainer}>
          {this.renderProfileImage()}
          <View style={styles.buttonContainer}>
            <Button
              style={styles.profileButton}
              textStyle={styles.profileButtonText}
              text="VIEW"
            />
            <Button
              style={[styles.profileButton, margins.marginTop.md]}
              textStyle={styles.profileButtonText}
              text="CONNECT"
            />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{this.props.connection.name}</Text>
            <Text style={styles.title}>{this.getConnectionTitle()}</Text>
          </View>
          <View style={styles.bioContainer}>
            <Text>{this.props.connection.bio}</Text>
          </View>
        </View>
        {this.renderCloseButton()}
      </Animated.View>
    );
  }
}


const styles = StyleSheet.create({
  /* Container of the entire box */
  baseContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    padding: 20,
    backgroundColor: colors.light_snow,
    shadowColor: colors.charcoal,
    shadowOpacity: 0.15,
    shadowOffset: { width: 5, height: -5 },
    shadowRadius: 15,
    zIndex: 100,
  },

  /* Container of left hand side column with picture and buttons */
  leftContainer: {
    flex: 1.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },

  /* Container of right hand side with name and description */
  rightContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  /* Container of two buttons below profile picture */
  buttonContainer: {
    flex: 1,
    marginTop: 20,
  },

  /* Container of name and title of veteran/org */
  nameContainer: {

  },

  /* Container of veteran/org bio */
  bioContainer: {
    marginTop: 30,
  },

  /* Individual components */
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileButton: {
    height: 30,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  profileButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.charcoal,
  },
  title: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.gray,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1000,
  },
});
