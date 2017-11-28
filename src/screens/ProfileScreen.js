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
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { APIRoutes } from '../helpers/routes/routes';
import BaseRequester from '../helpers/requesters/BaseRequester';
import { colors } from '../styles/colors';
import { margins } from '../styles/layout';
import { fontStyles } from '../styles/fonts';
import Button from '../components/Button';


export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sentConnectRequest: false,
    };

    this.connect = this.connect.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getParams() {
    return this.props.navigation.state.params;
  }

  getName() {
    const params = this.getParams();
    return params.name || `${params.first_name} ${params.last_name}`;
  }

  connect(event, onSuccess, onFailure) {
    event.preventDefault();
    const navParams = this.getParams();
    const id = navParams.currentVeteran.id;
    const route = APIRoutes.veteranFriendshipsPath(id);
    const params = {
      friendship: {
        veteran_id: id,
        friend_id: navParams.id,
      },
    };
    BaseRequester.post(route, params).then((response) => {
      console.log(response);
      navParams.onConnect();
      this.setState({ sentConnectRequest: true });
      onSuccess && onSuccess(response);
    }).catch((error) => {
      console.error(error);
      onError && onError(error);
    });
  }

  goBack() {
    return this.props.navigation.goBack();
  }

  renderBackButton() {
    const params = this.getParams();
    if (params.source == 'connect') {
      return (
        <TouchableOpacity
          onPress={this.goBack}
        >
          <View style={styles.backButtonContainer}>
            <Icon
              name="chevron-left"
              size={20}
              color={colors.white}
            />
            <Text style={[fontStyles.boldTextWhite, margins.marginLeft.md]}>
              BACK
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
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
        {!!params.email ? this.renderDetailRow("EMAIL", params.email) : null}
        {!!params.roles ? this.renderDetailRow("BRANCH OF SERVICE", params.roles.join(", ")) : null}

        {!!params.website ? this.renderDetailRow("WEBSITE", params.website) : null}
        {!!params.address ? this.renderDetailRow("ADDRESS", params.address) : null}
        {!!params.demographic ? this.renderDetailRow("DEMOGRAPHIC", params.demographic) : null}

      </View>
    );
  }

  renderConnectButton() {
    const params = this.getParams();
    if (params.is_friend || !params.source) {
      return;
    } else if (params.sent_friend_request || this.state.sentConnectRequest) {
      return (
        <Button
          style={margins.marginTop.md}
          onPress={this.connect}
          text="CONNECT"
          disabled={true}
        />
      );
    } else {
      return (
        <Button
          style={margins.marginTop.md}
          onPress={this.connect}
          text="CONNECT"
        />
      );
    }
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
            {this.getName()}
          </Text>
          {this.renderBackButton()}
        </View>

        <View style={styles.bodyContainer}>
          {this.renderDetails()}
          <View style={styles.bioContainer}>
          </View>
          {this.renderConnectButton()}
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
    padding: 10,
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  /* Container for this veteran/PO's bio */
  bioContainer: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Back button and text container */
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 25,
    left: 10,
    padding: 5,
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
