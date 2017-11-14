/**
 * Profile screen that either renders information about
 * the current user.
 */
import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

export default class ProfileScreen extends React.Component {

  render() {
    return (
      <View style={layoutStyles.flexCenter}>
        <Text>This is the Profile screen!</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  /* Container for the whole screen */
  baseContainer: {
    flex: 1,
    width: '100%',
    bottom: 0,
    left: 0,
    padding: 20,
    backgroundColor: colors.light_snow,
  },

  /* Container for the header bg/photo */
  coverContainer: {

  },

  /* Container for the body content */
  bodyContainer: {

  },

  /* Container for the details of this veteran/PO */
  detailsContainer: {

  },

  /* Container for this veteran/PO's bio */
  bioContainer: {
    
  },
});
