/**
 * Connect Screen that shows a map view of the neighborhood
 * around the user and renders pins corresponding to veterans
 * that are using the app and also signed up for Connect.
 *
 * @prop navigation.state.params      - current signed in veteran obj
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableHighlight, Modal, Image, Dimensions } from 'react-native';

import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import ConnectSignUpRequester from '../helpers/requesters/ConnectSignUpRequester';
import update from 'immutability-helper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { APIRoutes } from '../helpers/routes/routes';
import BaseRequester from '../helpers/requesters/BaseRequester';
import InfoModal from '../components/InfoModal';
import FriendRequestModal from '../components/FriendRequestModal';
import ConnectPin from '../components/ConnectPin';
import ConnectBox from '../components/ConnectBox';


export default class ConnectScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHelpModalOpen: true,
      veterans: [],
      parterOrgs: [],
      activeConnection: null,  // Indicates if a veteran/org has been focused
      stillLoading: true,
      onConnect: false,
      friendRequests: [],
    }

    this.onRegionChange = this.onRegionChange.bind(this);
    this.onConnectRequest = this.onConnectRequest.bind(this);
    this.closeHelpModal = this.closeHelpModal.bind(this);
    this.closeConnectBox = this.closeConnectBox.bind(this);
  }

  componentDidMount() {
    params = this.props.navigation.state.params;
    this.getConnectStatus(() => {
      this.getVeterans();
      this.getParterOrgs();
      this.getVeteranFriendRequests();
    });
  }

  navigateToSignUp() {
    this.props.navigation.navigate('ConnectSignUp', this.props.navigation.state.params);
  }

  /**
   * Gets whether current veteran is signed up with connect and
   * renders the appropriate screen, either sign up or the connect
   * map.
   *
   * @param {function} onConnectCallback: callback if veteran already
   *                                      signed up with connect
   */
  getConnectStatus(onConnectCallback) {
    const id = params.id;
    ConnectSignUpRequester.connectStatus(id).then((response) => {
      console.log(response);
      if(response.on_connect) {
        this.setState({ stillLoading: false, onConnect: true });
        onConnectCallback && onConnectCallback();
      } else {
        this.setState({ stillLoading: false, onConnect: false });
      }
    }).catch((error) => {
      console.log(error)
      this.setState({ stillLoading: false, onConnect: false });
    });
  }

  /**
   * Gets all veterans from the server and sets state once retrieved.
   */
  getVeterans() {
    const route = APIRoutes.veteransPath();
    BaseRequester.get(route).then((response) => {
      console.log(response[0]);
      this.setState({ veterans: response });
    }).catch((error) => {
      console.log(error);
    });
  }

  /**
   * Gets all POs from the server and sets state once retrieved.
   */
  getParterOrgs() {
    const route = APIRoutes.parterOrgsPath();
    BaseRequester.get(route).then((response) => {
      console.log(response[0]);
      this.setState({ parterOrgs: response });
    }).catch((error) => {
      console.log(error);
    });
  }

  /**
   * Gets all the friend requests of this veteran
   * to render on the screen.
   */
  getVeteranFriendRequests() {
    const id = this.props.navigation.state.params.id;
    const route = APIRoutes.veteranFriendRequestsPath(id);
    BaseRequester.get(route).then((response) => {
      console.log(response);
      this.setState({ friendRequests: response });
    }).catch((error) => {
      console.error(error);
    });
  }

  openHelpModal() {
    this.setState({ isHelpModalOpen: true });
  }

  closeHelpModal() {
    this.setState({ isHelpModalOpen: false });
  }

  /**
   * Removes the friend request from the state so it
   * isn't rendered until the next refresh.
   *
   * @param {integer} i: the index of the friend request
   *                     to be removed from the list 
   */
  closeFriendRequestModal(i) {
    return () => {
      const newFriendRequests = update(this.state.friendRequests, {
        $apply: (reqs) => {return reqs.splice(i, 1)},
      });
      console.log(newFriendRequests);
      this.setState({ friendRequests: newFriendRequests });
    };
  }

  openConnectBox(connection) {
    this.setState({
      activeConnection: connection,
    });
  }

  closeConnectBox() {
    this.setState({ activeConnection: null });
  }

  getInitialRegion() {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  onRegionChange(region) {
    this.setState({ region: region });
  }

  /**
   * Called when a marker is pressed and does two things:
   *   1. Animates map to center on coordinate
   *   2. Opens appropriate ConnectBox or refreshes current active box
   *
   * @param {object} connection: either a veteran or parter org object
   *                 with required fields as described in `ConnectBox`
   * @return {() => null}: a function that animates the mapview and also
   *                       opens the ConnectBox for this veteran/org
   */
  onMarkerPress(connection) {
    const coordinate = {
      latitude: connection.lat,
      longitude: connection.lng,
    };
    const mapAnimateDuration = 100;
    const connectBoxAnimateDuration = 200;

    return () => {
      // First need to animate map to current coordinate
      this.mapView && this.mapView.animateToCoordinate(coordinate, mapAnimateDuration);

      // Next also need to show Connect Box for this connection
      this.openConnectBox(connection);
    };
  }

  /**
   * Called when the ConnectBox "CONNECT" button is pressed by
   * this user, indicating a friend request sent to the other
   * user.
   */
  onConnectRequest() {
    this.state.activeConnection.sent_friend_request = true;
    this.setState({ activeConnection: this.state.activeConnection });
  }

  renderNotifications() {
    return (
      <View style={styles.notificationBox}>
        {this.renderHelpModal()}
        {this.renderFriendRequests()}
      </View>
    )
  }

  /**
   * Renders a help modal with some information when the user first
   * sees the page.
   */
  renderHelpModal() {
    if (this.state.isHelpModalOpen) {
      const { params } = this.props.navigation.state;
      return (
        <InfoModal
          title={`WELCOME TO CONNECT, ${params.first_name}!`}
          text="Pan the map to see who's around you."
          onClose={this.closeHelpModal}
        />
      );
    }
  }

  renderFriendRequests() {
    return this.state.friendRequests.map((veteran, i) => {
      return (
        <FriendRequestModal
          veteran={veteran}
          currentVeteran={this.props.navigation.state.params}
          onClose={this.closeFriendRequestModal(i)}
          key={`friend_request_${i}`}
        />
      );
    });
  }

  /**
   * Return a list of MapView Markers that represent veterans.
   * TODO (Ken): See if you can use underscore.js partials instead of
   * rocket function to bind the onPress method
   */
  renderVeteranMarkers() {
    return this.state.veterans.map((veteran) => {
      const coordinate = {
        latitude: parseFloat(veteran.lat),
        longitude: parseFloat(veteran.lng),
      };
      return (
        <MapView.Marker
          coordinate={coordinate}
          onPress={this.onMarkerPress(veteran)}
          key={`veteran-${veteran.id}`}
        >
          <ConnectPin pinType="veteran" />
        </MapView.Marker>
      );
    });
  }

  /**
   * Return a list of MapView Markers that represent partering orgs.
   * TODO (Ken): See if you can use underscore.js partials instead of
   * rocket function to bind the onPress method
   */
  renderParterOrgMarkers() {
    return this.state.parterOrgs.map((org) => {
      const coordinate = {
        latitude: parseFloat(org.lat),
        longitude: parseFloat(org.lng),
      };
      return (
        <MapView.Marker
          coordinate={coordinate}
          onPress={this.onMarkerPress(org)}
          key={`parterOrg-${org.id}`}
        >
          <ConnectPin pinType="parterOrg" />
        </MapView.Marker>
      );
    })
  }

  renderConnectBox() {
    return this.state.activeConnection ? (
      <ConnectBox
        connection={this.state.activeConnection}
        onClose={this.closeConnectBox}
        onConnect={this.onConnectRequest}
        currentVeteran={this.props.navigation.state.params}
      />
    ) : null;
  }

  renderConnectSignUp() {
    return (
      <View style= {{ flex: 1 }}>
        <Image style={ styles.backgroundImg } source={require('../../assets/images/map.jpg')}/>
        <View style={ styles.backgroundOverlay }>
          <View style={ styles.contentContainer}>
            <Text style={ styles.subtitleText }>
              Get started with
            </Text>
            <Text style={ styles.titleText }>
              Veterans 360 Connect
            </Text>
            <View style={{ marginTop: 20, flex: 1, marginBottom: 60, alignItems: 'center' }}>
              <View style={ styles.tile }>
                <View style={ styles.tileIcon }>
                  <Icon name="map-marker" size={50} color={'#18B671'} />
                </View>
                <View style={ styles.tileText }>
                  <Text style={ styles.tileTitleText }>
                    EXPLORE
                  </Text>
                  <Text style={ styles.bodyText }>
                    veterans and partnered veteran organizations around your area.
                  </Text>
                </View>
              </View>
              <View style={ styles.line }>
              </View>
              <View style={ styles.tile }>
                <View style={ styles.tileIcon }>
                  <Icon name="users" size={50} color={'#18B671'} />
                </View>
                <View style={ styles.tileText }>
                  <Text style={ styles.tileTitleText }>
                    CONNECT
                  </Text>
                  <Text style={ styles.bodyText }>
                    with other veterans like you and get in touch.
                  </Text>
                </View>
              </View>
              <View style={ styles.line }>
              </View>
              <View style={ styles.tile }>
                <View style={ styles.tileIcon }>
                  <Icon name="calendar-check-o" size={50} color={'#18B671'} />
                </View>
                <View style={ styles.tileText }>
                  <Text style={ styles.tileTitleText }>
                    STAY UP TO DATE
                  </Text>
                  <Text style={ styles.bodyText }>
                    with every new event and resource created by your connections.
                  </Text>
                </View>
              </View>
            </View>
            <TouchableHighlight onPress={ () => { this.navigateToSignUp(); } } style={styles.button}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.stillLoading) {
      return <View />
    } else if (!this.state.onConnect) {
      return this.renderConnectSignUp();
    }

    return (
      <View style={styles.baseContainer}>
        {this.renderNotifications()}
        <MapView
          ref={(ref) => this.mapView = ref}
          style={styles.baseMapContainer}
          initialRegion={this.getInitialRegion()}
        >
          {this.renderVeteranMarkers()}
          {this.renderParterOrgMarkers()}
        </MapView>
        {this.renderConnectBox()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseMapContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImg: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  contentContainer: {
    position: 'absolute',
    top: 40,
    bottom: 40,
    left: 40,
    right: 40,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'source-sans-pro-semibold',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 24,
    fontFamily: 'source-sans-pro-light',
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 12,
    fontFamily: 'source-sans-pro-regular',
  },
  tileTitleText: {
    fontFamily: 'source-sans-pro-bold',
    fontSize: 12,
    color:'#949494',
  },
  tile: {
    backgroundColor: 'rgb(255, 255, 255)',
    flex: 3,
    shadowColor:'black',
    shadowOpacity:0.05,
    shadowOffset:{width:5, height:10},
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  line: {
    flex: 2,
    width: 2,
    backgroundColor: '#18B671',
  },
  tileIcon: {
    flex: 1,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    flex: 3,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'source-sans-pro-bold',
    fontSize: 20,
    color:'#ffffff',
  },
  button: {
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    marginRight: 60,
    marginLeft:60,
    backgroundColor:'#18B671',
  },
  notificationBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: 10,
    marginTop: 30,
    zIndex: 100,
  },
});
