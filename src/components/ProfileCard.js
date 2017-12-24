/**
 * Profile card for one veteran to be displayed in the profile gallery.
 *
 * @prop styles          - style override (set width)
 * @prop veteran         - veteran object
 * @prop currentVeteran  - currently logged in veteran obj
 * @prop onConnect       - callback when connect pressed
 * @prop showProfile     - callback to show profile
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import _ from 'underscore';
import update from 'immutability-helper';

import { margins } from '../styles/layout';
import { colors } from '../styles/colors';
import { fontStyles } from '../styles/fonts';
import { APIRoutes } from '../helpers/routes/routes';
import BaseRequester from '../helpers/requesters/BaseRequester';
import Button from '../components/Button';


export default class ProfileCard extends React.Component {

  constructor(props) {
    super(props);

    this.connectWithVeteran = this.connectWithVeteran.bind(this);
  }

  connectWithVeteran(event, onSuccess, onFailure) {
    event.preventDefault();
    const id = this.props.currentVeteran.id;
    const route = APIRoutes.veteranFriendshipsPath(id);
    const params = {
      friendship: {
        veteran_id: id,
        friend_id: this.props.veteran.id,
      },
    };
    BaseRequester.post(route, params).then((response) => {
      this.props.onConnect();
      onSuccess && onSuccess(response);
    }).catch((error) => {
      console.error(error);
      onFailure && onFailure(error);
    });
  }

  render() {
    const veteran = this.props.veteran;
    const navParams = update(veteran, {$merge: {
      source: 'home',
      currentVeteran: this.props.currentVeteran,
      onConnect: this.props.onConnect,
    }});
    return (
      <TouchableOpacity
        onPress={_.partial(this.props.showProfile, navParams)}
      >
        <View style={[styles.baseContainer, this.props.style]}>
          <View style={styles.backgroundBox} />

          <View style={styles.contentContainer}>
            <Image
              source={require('../../assets/images/photogenic.jpg')}
              style={styles.veteranImage}
            />
          <Text style={[fontStyles.boldText, margins.marginTop.md, fontStyles.centered]}>
              {`${veteran.first_name} ${veteran.last_name}`}
            </Text>
            <Text style={[fontStyles.bodyTextSmall, margins.marginTop.xs, fontStyles.centered]}>
              {`${veteran.military_branch}`}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.connectButton}
              textStyle={styles.connectButtonText}
              text={veteran.is_friend ? 'FRIEND' : 'CONNECT'}
              disabled={veteran.is_friend || veteran.sent_friend_request}
              onPress={this.connectWithVeteran}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

}

ProfileCard.propTypes = {
  veteran: PropTypes.object.isRequired,
  currentVeteran: PropTypes.object.isRequired,
  onConnect: PropTypes.func.isRequired,
  showProfile: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  /* Contains the entire component */
  baseContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 150,
    height: 270,
    margin: 5,
    padding: 15,
  },

  /* Absolute positioned box that is slightly offset from top */
  backgroundBox: {
    position: 'absolute',
    height: '90%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: colors.charcoal,
    shadowOpacity: 0.15,
    shadowOffset: { width: 5, height: -5 },
    shadowRadius: 15,
  },

  /* Contains the veteran image, name, title */
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  /* Contains the connect button */
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  /* Individual items */
  veteranImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: colors.charcoal,
    shadowOpacity: 0.15,
    shadowOffset: { width: 5, height: -5 },
    shadowRadius: 15,
    zIndex: 100,
  },
  connectButton: {
    width: '100%',
    height: 36,
    borderRadius: 18,
  },
  connectButtonText: {
    fontSize: 16,
  },
});
