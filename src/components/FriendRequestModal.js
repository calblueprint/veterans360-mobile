/**
 * Simple hovering info modal that displays a title and a paragraph text
 * and can be closed.
 *
 * @prop style            - style override
 * @prop veteran          - veteran object that sent the friend request
 * @prop onClose          - callback executed when modal is closed
 * @prop showProfile      - function that navigates to
 *                          a user or PO's profile
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';

import { margins } from '../styles/layout';
import { colors } from '../styles/colors';
import { APIRoutes } from '../helpers/routes/routes';
import BaseRequester from '../helpers/requesters/BaseRequester';
import Animations from '../styles/animations';
import Button from '../components/Button';

export default class FriendRequestModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      helpAnimationValue: new Animated.Value(0),
    };

    this.closeModal = this.closeModal.bind(this);
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    this.rejectFriendRequest = this.rejectFriendRequest.bind(this);
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

  /**
   * Accepts this veteran's friend request. Creates the friendship
   * model association between currentVeteran and veteran.
   */
  acceptFriendRequest(event, onSuccess, onError) {
    const id = this.props.currentVeteran.id;
    const route = APIRoutes.veteranFriendshipsPath(id);
    const params = {
      friendship: {
        friend_id: this.props.veteran.id,
      },
    };
    BaseRequester.post(route, params).then((response) => {
      onSuccess && onSuccess(response);
      this.closeModal();
    }).catch((error) => {
      console.error(error);
      onError && onError(error);
    });
  }

  /**
   * Rejects this veteran's friend request by removing
   * the inverse friendship between this veteran and the
   * friend who is requesting the friendship.
   */
  rejectFriendRequest(event, onSuccess, onError) {
    const id = this.props.currentVeteran.id;
    const route = APIRoutes.veteranRejectFriendshipPath(id);
    const params = {
      friendship: {
        friend_id: this.props.veteran.id,
      },
    };
    BaseRequester.patch(route, params).then((response) => {
      this.closeModal();
      onSuccess && onSuccess();
    }).catch((error) => {
      console.error(error);
      onError && onError(error);
    });
  }

  render() {
    const veteran = this.props.veteran;
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

        <View style={styles.profileRowContainer}>
          <View style={styles.nameImageContainer}>
            <Image
              source={require('../../assets/images/photogenic.jpg')}
              style={styles.image}
            />
            <Text style={styles.name}>
              {`${veteran.first_name} ${veteran.last_name}`}
            </Text>
          </View>
          <View style={styles.seeMoreIconContainer}>
            <Icon
              name="eye"
              size={28}
              color={colors.green}
              onPress={() => {this.props.showProfile(veteran)}}
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            style={[styles.acceptButton, margins.marginTop.md]}
            textStyle={styles.buttonText}
            text="ACCEPT"
            onPress={this.acceptFriendRequest}
          />
          <Button
            style={[styles.rejectButton, margins.marginTop.md]}
            textStyle={styles.buttonText}
            text="REJECT"
            onPress={this.rejectFriendRequest}
          />
        </View>

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
  profileRowContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  nameImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  seeMoreIconContainer: {
    minWidth: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: colors.charcoal,
    fontSize: 18,
    fontFamily: 'source-sans-pro-bold',
  },
  bodyText: {
    color: colors.charcoal,
    backgroundColor: 'transparent',
    fontSize: 16,
    fontFamily: 'source-sans-pro-regular'
  },
  acceptButton: {
    height: 30,
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.green,
  },
  rejectButton: {
    height: 30,
    borderRadius: 15,
    marginLeft: 40,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.red,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'source-sans-pro-bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
