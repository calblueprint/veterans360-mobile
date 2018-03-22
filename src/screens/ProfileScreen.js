/**
 * Profile screen that either renders information about
 * the current user. Can be used to render EITHER the
 * current user or another user by passing in a prop
 * called `params`, more detail below. Consider @params
 * to be `this.props.navigation.state.params`:
 *
 * @params.source           - source screen that user has
 *                            navigated from
 * @params.currentVeteran   - currently logged in veteran
 * @params.onConnect        - callback for connecting
 * @params.profileType      - either 'veteran' or 'po'
 * @params.first_name
 * @params.last_name
 * @params.email
 * @params.roles
 */
// import { Actions } from 'react_native_route_flux';
import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { APIRoutes } from '../helpers/routes/routes';
import BaseRequester from '../helpers/requesters/BaseRequester';
import LoginRequester from '../helpers/requesters/LoginRequester';
import { colors } from '../styles/colors';
import { margins } from '../styles/layout';
import { fontStyles } from '../styles/fonts';
import Button from '../components/Button';
import EditProfileScreen from './EditProfileScreen';
import ProfileScreenNavigator from '../navigators/ProfileScreenNavigator';


export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    /**
     * TODO (Ken): Currently this is a hard coded state change on the profile
     * screen when a user has presesed the connect button, but it would
     * be best if this were handled in tandem with refreshing the parent
     * component's veteran `sent_friend_request` state.
     */
    this.state = {
      sentConnectRequest: false,
    };

    this.connectWithVeteran = this.connectWithVeteran.bind(this);
    this.connectWithPO = this.connectWithPO.bind(this);
    this.goBack = this.goBack.bind(this);
    this.logout = this.logout.bind(this);

  }

  _fetchVeteran(id) {

  }


  getParams() {
    return this.props.navigation.state.params;
  }

  /**
   * Gets profile display name.
   */
  getName() {
    const params = this.getParams();
    console.log('inprof');
    console.log(params.first_name);
    return params.name || `${params.first_name} ${params.last_name}`;
  }

  /**
   * Attempts to connect with this veteran whose profile is shown.
   * The currently signed up veteran object is given in the navigation
   * params and is supplied by the Connect screen.
   *
   * TODO (Ken): Need to add compatibility for PO requests
   */
  connectWithVeteran(event, onSuccess, onFailure) {
    event.preventDefault();
    const navParams = this.getParams();
    const id = navParams.currentVeteran.id;
    const route = APIRoutes.veteranFriendshipsPath(id);
    const params = {
      friendship: {
        friend_id: navParams.id,
      },
    };
    BaseRequester.post(route, params).then((response) => {
      navParams.onConnect(navParams.id);
      this.setState({ sentConnectRequest: true });
      onSuccess && onSuccess(response);
    }).catch((error) => {
      console.error(error);
      onFailure && onFailure(error);
    });
  }

  connectWithPO(event, onSuccess, onFailure) {
    event.preventDefault();
    const navParams = this.getParams();
    const id = navParams.currentVeteran.id;
    const route = APIRoutes.veteranSubscribePath(id);
    const params = {
      subscription: {
        partnering_organization_id: navParams.id,
      },
    };
    BaseRequester.post(route, params).then((response) => {
      navParams.onConnect();
      this.setState({ sentConnectRequest: true });
      onSuccess && onSuccess(response);
    }).catch((error) => {
      console.error(error);
      onFailure && onFailure(error);
    });
  }

  /**
   * Goes to the previous screen.
   */
  goBack() {
    return this.props.navigation.goBack();
  }



  /**
   * Logs out the user from the app.
   */
  logout() {
    LoginRequester.logout().then((response) => {
      this.props.navigation.navigate('Login');
    }).catch((error) => {
      console.error(error);
    });
  }


  /**
   * Renders the back button and label unless comes from the main
   * tab navigator (then source is none).
   */
  renderBackButton() {
    const params = this.getParams();
    if (!!params.source) {
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

  /**
   * Renders a detail row, which consists of a label and text.
   *
   * Ex. NAME    Rob Jones
   */
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

  /**
   * Renders all detail rows applicable to this object.
   * Adds each of the fields manually since some might need additional
   * processing from the backend.
   *
   * TODO (Ken): Finish adding fields as they are finished being
   * added to the backend.
   */
  renderDetails() {
    const params = this.getParams();
    return (
      <View style={styles.detailsContainer}>
        {!!params.email ? this.renderDetailRow("EMAIL", params.email) : null}
        {!!params.roles ? this.renderDetailRow("BRANCH OF SERVICE", params.roles.join(", ")) : null}
        {!!params.website ? this.renderDetailRow("WEBSITE", params.website) : null}
        {params.is_friend && !!veteran.address ? this.renderDetailRow("ADDRESS", params.address) : null}
        {!!params.demographic ? this.renderDetailRow("DEMOGRAPHIC", params.demographic) : null}
        {!!params.military_branch ? this.renderDetailRow("MILITARY BRANCH", params.military_branch) : null}
        {params.is_friend && !!veteran.phone_number ? this.renderDetailRow("PHONE_NUMBER", params.phone_number) : null}
      </View>
    );
  }

  /**
   * Renders the connect button UNLESS:
   *   - If own profile, don't render anything
   *   - If profile is a veteran friend, don't render anything
   *   - If profile is a veteran whom sent friend request to, render
   *     a disabled button
   */
  renderConnectButton() {
    const params = this.getParams();
    const connectMethod = params.profileType === 'veteran' ? this.connectWithVeteran : this.connectWithPO;
    if (params.is_friend || !params.source) {
      return;
    } else if (params.sent_friend_request || params.is_subscribed_to || this.state.sentConnectRequest) {
      return (
        <Button
          style={[margins.marginTop.md, {backgroundColor: colors.gray}]}
          onPress={connectMethod}
          text={params.is_subscribed_to ? "FOLLOWING" : "REQUESTED"}
          disabled={true}
        />
      );
    } else {
      return (
        <Button
          style={margins.marginTop.md}
          onPress={connectMethod}
          text="CONNECT"
        />
      );
    }
  }

  /**
   * Renders the logout button IF the params.source
   * does not exist (user accessed profile through)
   * the tab navigator.
   */
  renderLogoutButton() {
    const params = this.getParams();
    if (!params.source) {
      return (
        <TouchableOpacity
          onPress={this.logout}
          style={styles.logoutButton}
        >
          <Text style={fontStyles.boldTextRed}>
            LOG OUT
          </Text>
        </TouchableOpacity>
      );
    }
  }

  navigateEditScreen() {
    const params = this.getParams();
    console.log('NavigateEditScreen');
    console.log(params);
    return(
    <TouchableOpacity
          onPress={() => this.props.navigation.navigate('EditProfile', {
            params: params})}
            style={styles.editButton}>

          <Text style={fontStyles.boldTextGreen}>
          Edit
          </Text>
      </TouchableOpacity>
    );
    }


  render() {
    const params = this.getParams();
    console.log('diditchange');
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

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.bodyContainer}>
            {this.renderDetails()}
            <View style={styles.bioContainer}>
            </View>
            {this.renderConnectButton()}
            {this.renderLogoutButton()}
            {this.navigateEditScreen()}
          </View>
        </ScrollView>
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
    height: '30%',
    width: '100%',
    backgroundColor: colors.green,
    zIndex: 100,
  },

  /* Container for the ScrollView */
  scrollContainer: {
    flex: 1,
  },

  /* Container for the body content */
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
  logoutButton: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    borderColor: colors.red,
    borderWidth: 2,
    backgroundColor: colors.white,
  },

  editButton: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    borderColor: colors.green,
    borderWidth: 2,
    backgroundColor: colors.white,
  }
  // editButton: {
  //   marginTop: 30,
  //   paddingTop: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   borderRadius: 5,
  //   borderColor: colors.red,
  //   borderWidth: 2,
  //   backgroundColor: colors.white,
  // }
});
