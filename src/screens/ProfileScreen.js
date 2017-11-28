/**
 * Profile screen that either renders information about
 * the current user. Can be used to render EITHER the
 * current user or another user by passing in a prop
 * called `params`, more detail below. Consider @params
 * to be `this.props.navigation.state.params`:
 *
 * @params.source        - source screen that user has
 *                        navigated from
 * @params.first_name
 * @params.last_name
 * @params.email
 * @params.roles
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';

import { StyleSheet, Text, View, Image } from 'react-native';
import { colors } from '../styles/colors';
import { margins } from '../styles/layout';
import { fontStyles } from '../styles/fonts';
import Button from '../components/Button';

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    this.connect = this.connect.bind(this);
  }

  getParams() {
    return this.props.navigation.state.params;
  }

  connect(event, onSuccess, onFailure) {

  }

  renderDetailRow(label, value) {
    return (
      <View style={styles.detailRowContainer}>
        <View style={styles.detailLabelContainer}>
          <Text style={fontStyles.labelText}>{label}</Text>
        </View>
        <View style={styles.detailValueContainer}>
          <Text style={fontStyles.bodyText}>{value}</Text>
        </View>
      </View>
    );
  }

  renderDetails() {
    const params = this.getParams();
    return (
      <View style={styles.detailsContainer}>
        {this.renderDetailRow("EMAIL", params.email)}
        {this.renderDetailRow("BRANCH OF SERVICE", params.roles.join(", "))}
      </View>
    );
  }

  render() {
    const params = this.getParams();
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
          {this.renderDetails()}
          <View style={styles.bioContainer}>
          </View>
          { params.source == 'connect' ? (
            <Button
              style={margins.marginTop.md}
              onPress={this.connect}
              text="CONNECT"
            />
          ) : null }
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
    zIndex: 100,
  },

  /* Container for the body content */
  bodyContainer: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Container for the details of this veteran/PO */
  detailsContainer: {
    margin: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Container for one row of details LABEL -> value */
  detailRowContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Container for label in a row */
  detailLabelContainer: {
    flex: 1,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  /* Container for value field in a row */
  detailValueContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
