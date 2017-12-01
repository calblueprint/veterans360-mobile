/**
 * Simple horizontal scrollable profile gallery shown on the
 * Home Screen.
 *
 * @prop veterans         - list of veterans to display
 * @prop currentVeteran   - current veteran logged in
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import update from 'immutability-helper';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { colors } from '../styles/colors';
import ProfileCard from '../components/ProfileCard';


export default class ProfileGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      veterans: this.getVeteransCopy(),
    };

    this.onConnectRequest = this.onConnectRequest.bind(this);
  }

  /**
   * Get a deep copy of the veterans list since we don't
   * want to mutate props.
   */
  getVeteransCopy() {
    const copy = JSON.parse(JSON.stringify(this.props.veterans))
    return copy;
  }

  onConnectRequest(i) {
    const newVeterans = update(this.state.veterans, {
      veterans: {
        [i]: {
          sent_friend_request: { $set: true },  
        },
      },
    });
    this.setState({ veterans: newVeterans });
  }

  renderProfileCards() {
    return this.state.veterans.map((veteran, i) => {
      return (
        <ProfileCard
          veteran={veteran}
          currentVeteran={this.props.currentVeteran}
          onConnect={_.partial(this.onConnectRequest, i)}
        />
      );
    });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
      >
        {this.renderProfileCards()}
      </ScrollView>
    );
  }

}

styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
