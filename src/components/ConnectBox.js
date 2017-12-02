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
 * @prop connectionType   - either 'veteran' or 'po'
 * @prop currentVeteran   - veteran that is currently logged in
 * @prop onConnect        - callback to be executed after connect request
 * @prop onClose          - callback to be executed when close button pressed
 * @prop showProfile      - function that navigates to
 *                          a user or PO's profile
 */

import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@expo/vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
} from 'react-native';
import update from 'immutability-helper';

import { colors } from '../styles/colors';
import { layoutStyles, margins } from '../styles/layout';
import { APIRoutes } from '../helpers/routes/routes';
import BaseRequester from '../helpers/requesters/BaseRequester';
import Animations from '../styles/animations';
import Button from '../components/Button';

export default class ConnectBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      animationValue: new Animated.Value(0),
    };

    this.onBoxClose = this.onBoxClose.bind(this);
    this.connectWithVeteran = this.connectWithVeteran.bind(this);
    this.connectWithPO = this.connectWithPO.bind(this);
    this.showProfile = this.showProfile.bind(this);
  }

  componentDidMount() {
    Animations.fade(this.state.animationValue, toValue = 1).start();
  }

  onBoxClose() {
    Animations.fade(this.state.animationValue).start(() => {
      this.props.onClose();
    });
  }

  getConnectionName() {
    const connection = this.props.connection;
    return connection.name || `${connection.first_name} ${connection.last_name}`;
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

  connectWithVeteran(event, onSuccess, onFailure) {
    event.preventDefault();
    const id = this.props.currentVeteran.id;
    const route = APIRoutes.veteranFriendshipsPath(id);
    const params = {
      friendship: {
        veteran_id: id,
        friend_id: this.props.connection.id,
      },
    };
    BaseRequester.post(route, params).then((response) => {
      this.props.onConnect();
      onSuccess && onSuccess(response);
    }).catch((error) => {
      console.error(error);
      onError && onError(error);
    });
  }

  connectWithPO(event, onSuccess, onFailure) {
    event.preventDefault();
    const id = this.props.currentVeteran.id;
    const route = APIRoutes.veteranSubscribePath(id);
    const params = {
      subscription: {
        veteran_id: id,
        partnering_organization_id: this.props.connection.id,
      },
    };
    BaseRequester.post(route, params).then((response) => {
      this.props.onConnect();
      onSuccess && onSuccess(response);
    }).catch((error) => {
      console.error(error);
      onError && onError(error);
    });
  }

  showProfile(event, onSuccess, onFailure) {
    const connection = update(this.props.connection, {$merge: {
      profileType: this.props.connectionType,
    }});
    this.props.showProfile(connection);
    onSuccess && onSuccess();
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
    const connection = this.props.connection;
    const buttonStyle = connection.is_friend ? styles.friendButton : styles.profileButton;
    const connectMethod = this.props.connectionType === 'veteran' ? this.connectWithVeteran : this.connectWithPO;

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
              onPress={this.showProfile}
            />
            <Button
              style={[buttonStyle, margins.marginTop.md]}
              textStyle={styles.profileButtonText}
              text={connection.is_friend ? 'FRIEND' : 'CONNECT'}
              disabled={connection.is_friend || connection.sent_friend_request || connection.is_subscribed_to}
              onPress={connectMethod}
            />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{this.getConnectionName()}</Text>
            <Text style={styles.title}>{this.getConnectionTitle()}</Text>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>{connection.bio}</Text>
          </View>
        </View>
        {this.renderCloseButton()}
      </Animated.View>
    );
  }
}

ConnectBox.propTypes = {
  connection: PropTypes.object.isRequired,
  connectionType: PropTypes.oneOf(['veteran', 'po']).isRequired,
  currentVeteran: PropTypes.object.isRequired,
  onConnect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  showProfile: PropTypes.func.isRequired,
};

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
    flex: 1.6,
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
    paddingLeft: 12,
    paddingRight: 12,
  },
  friendButton: {
    height: 25,
    borderRadius: 4,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.blue,
  },
  profileButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontFamily: 'source-sans-pro-bold',
    color: colors.charcoal,
  },
  title: {
    fontSize: 16,
    fontFamily: 'source-sans-pro-italic',
    color: colors.gray,
  },
  bio: {
    fontSize: 16,
    fontFamily: 'source-sans-pro-regular',
    color: colors.charcoal,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1000,
  },
});
