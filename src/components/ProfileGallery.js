/**
 * Simple horizontal scrollable profile gallery shown on the
 * Home Screen.
 *
 * @prop veterans         - list of veterans to display
 * @prop currentVeteran   - current veteran logged in
 * @prop onConnect        - callback when connect pressed
 * @prop showProfile      - callback to show profile
 */

import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";

import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors } from "../styles/colors";
import ProfileCard from "../components/ProfileCard";

export default class ProfileGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  renderProfileCards() {
    return this.props.veterans.map((veteran, i) => {
      return (
        <ProfileCard
          veteran={veteran}
          currentVeteran={this.props.currentVeteran}
          onConnect={_.partial(this.props.onConnect, i)}
          showProfile={this.props.showProfile}
          key={`profile_card_${i}`}
        />
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal>
        <View style={styles.baseContainer}>{this.renderProfileCards()}</View>
      </ScrollView>
    );
  }
}

ProfileGallery.propTypes = {
  veterans: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentVeteran: PropTypes.object.isRequired,
  onConnect: PropTypes.func.isRequired,
  showProfile: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20
  }
});
