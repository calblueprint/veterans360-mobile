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

import {
  StyleSheet,
  Text,
  View,
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
    return JSON.parse(JSON.stringify(this.props.veterans));
  }

  onConnectRequest(i) {

  }

  renderProfileCards() {
    return this.state.veterans.map((veteran, i) => {
      return (
        <ProfileCard
          veteran={veteran}
          currentVeteran={this.props.currentVeteran}
          onConnect={this.onConnectRequest}
        />
      )
    });
  }

  render() {


  }

}
