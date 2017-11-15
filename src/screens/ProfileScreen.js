/**
 * Profile screen that either renders information about
 * the current user.
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';

import { StyleSheet, Text, View, Image } from 'react-native';
import { colors } from '../styles/colors';

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  getParams() {
    return this.props.params || this.props.navigation.state.params;
  }

  render() {
    params = this.getParams();
    console.log(params);
    return (
      <View style={styles.baseContainer}>
        <View style={styles.coverContainer}>
          <Image
            source={require('../../assets/images/photogenic.jpg')}
            style={styles.profilePicture}
          />
        <Text style={styles.profileName}>
          {`${params.first_name} ${params.last_name}`}
        </Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.detailsContainer}>
          </View>
          <View style={styles.bioContainer}>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  /* Container for the whole screen */
  baseContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.light_snow,
  },

  /* Container for the header bg/photo */
  coverContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.green,
  },

  /* Container for the body content */
  bodyContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Container for the details of this veteran/PO */
  detailsContainer: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Container for this veteran/PO's bio */
  bioContainer: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Individual items */
  profilePicture: {
    position: 'absolute',
    left: 20,
    bottom: -40,
    width: 120,
    height: 120,
    borderWidth: 5,
    borderColor: colors.white,
    borderRadius: 60,
    shadowColor: colors.charcoal,
    shadowOpacity: 0.15,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    zIndex: 100,
  },
  profileName: {
    position: 'absolute',
    left: 160,
    bottom: 10,
    fontSize: 28,
    fontFamily: 'source-sans-pro-regular',
    color: colors.white,
  },
});
