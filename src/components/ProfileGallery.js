/**
 * Simple horizontal scrollable profile gallery shown on the
 * Home Screen.
 *
 * @prop veterans         - list of veterans to display
 * @prop currentVeteran   - current veteran logged in
 * @prop onConnect        - callback when connect pressed
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

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
  }

  // componentDidMount() {
  //   this.setState({ veterans: this.getVeteransCopy() });
  // }

  /**
   * Get a deep copy of the veterans list since we don't
   * want to mutate props.
   */
  getVeteransCopy() {
    const copy = JSON.parse(JSON.stringify(this.props.veterans));
    return copy;
  }

  renderProfileCards() {
    return this.props.veterans.map((veteran, i) => {
      return (
        <ProfileCard
          veteran={veteran}
          currentVeteran={this.props.currentVeteran}
          onConnect={_.partial(this.props.onConnect, i)}
          key={`profile_card_${i}`}
        />
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal>
        <View style={styles.baseContainer}>
          {this.renderProfileCards()}
        </View>
      </ScrollView>
    );
  }

}

ProfileGallery.propTypes = {
  veterans: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentVeteran: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
