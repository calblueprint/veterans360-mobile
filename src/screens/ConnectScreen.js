/**
 * Connect Screen that shows a map view of the neighborhood
 * around the user and renders pins corresponding to veterans
 * that are using the app and also signed up for Connect.
 *
 * @prop navigation.state.params      - current signed in veteran obj
 */

import React from "react";
import Icon from "@expo/vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import update from "immutability-helper";

import { imageStyles } from "../styles/images";
import { layoutStyles } from "../styles/layout";
import ConnectSignUpRequester from "../helpers/requesters/ConnectSignUpRequester";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { APIRoutes } from "../helpers/routes/routes";
import BaseRequester from "../helpers/requesters/BaseRequester";
import InfoModal from "../components/InfoModal";
import FriendRequestModal from "../components/FriendRequestModal";
import ConnectPin from "../components/ConnectPin";
import ConnectBox from "../components/ConnectBox";

import SessionManager from "../helpers/utils/session";

export default class ConnectScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionUser: null,
      isHelpModalOpen: true,
      veterans: [],
      parterOrgs: [],
      currentPos: [],
      currentVets: [],
      activeConnection: null, // Indicates if a veteran/org has been focused
      activeConnectionType: null, // Either 'veteran' or 'po'
      stillLoading: true,
      onConnect: false,
      friendRequests: [],
    };

    this.veteransMapping = {};

    this.onRegionChange = this.onRegionChange.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.onConnectRequest = this.onConnectRequest.bind(this);
    this.closeHelpModal = this.closeHelpModal.bind(this);
    this.closeConnectBox = this.closeConnectBox.bind(this);
    this.navigateToConnectProfile = this.navigateToConnectProfile.bind(this);
  }

  async componentDidMount() {
    console.log("mounted connect!");
    // params = this.props.navigation.state.params;
    // console.log(this.props.navigation.state.params);
    // this.getConnectStatus(() => {
    // });
    await this.hydrateVeteran();
    this.getVeterans();
    this.getParterOrgs();
    this.getVeteranFriendRequests();
  }

  async hydrateVeteran() {
    try {
      const sessionUser = await SessionManager.getUserSession();
      await this.setState({ sessionUser: sessionUser });
    } catch (error) {
      console.error("Could not hydrate veteran.");
      return;
    }
  }

  navigateToSignUp() {
    this.props.navigation.navigate("ConnectSignUp", this.state.sessionUser);
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
    const params = this.state.sessionUser;
    const id = params.id;
    ConnectSignUpRequester.connectStatus(id)
      .then(response => {
        if (response.on_connect) {
          this.setState({ stillLoading: false, onConnect: true });
          onConnectCallback && onConnectCallback();
        } else {
          this.setState({ stillLoading: false, onConnect: false });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ stillLoading: false, onConnect: false });
      });
  }

  /**
   * Gets all veterans from the server and sets state once retrieved.
   */
  async getVeterans() {
    const route = APIRoutes.veteransPath();
    try {
      let { json, headers } = await BaseRequester.get(route);
      this.setState({ veterans: json });
      this.veteransMapping = this.buildVeteransMapping(json);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Gets all POs from the server and sets state once retrieved.
   */
  async getParterOrgs() {
    const route = APIRoutes.parterOrgsPath();
    try {
      let { json, headers } = await BaseRequester.get(route);
      this.setState({ parterOrgs: json });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Gets all the friend requests of this veteran
   * to render on the screen.
   */
  async getVeteranFriendRequests() {
    const id = this.state.sessionUser.id;
    const route = APIRoutes.veteranFriendRequestsPath(id);
    try {
      let { json, headers } = await BaseRequester.get(route);
      this.setState({ friendRequests: json });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Builds a map between veteran IDs and veteran objects for fast state updates
   */
  buildVeteransMapping(veterans) {
    let mapping = {};
    veterans.forEach(veteran => {
      mapping[veteran.id] = veteran;
    });
    return mapping;
  }

  /**
   * Get's veteran object with corresponding veteran ID
   */
  getVeteran(id) {
    return this.veteransMapping[id];
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
      this.state.friendRequests.splice(i, 1);
      this.setState({ friendRequests: this.state.friendRequests });
    };
  }

  openConnectBox(connection, connectionType) {
    this.setState({
      activeConnection: connection,
      activeConnectionType: connectionType,
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

  onRegionChangeComplete(region) {
    const buffer = 0.3;
    const vets = this.state.veterans.filter(vet => {
      const lat = parseFloat(vet.lat);
      const lng = parseFloat(vet.lng);
      return (
        lat <= region.latitude + region.latitudeDelta / (2 - buffer) &&
        lat >= region.latitude - region.latitudeDelta / (2 - buffer) &&
        lng <= region.longitude + region.longitudeDelta / (2 - buffer) &&
        lng >= region.longitude - region.longitudeDelta / (2 - buffer)
      );
    });
    const pos = this.state.parterOrgs.filter(po => {
      const lat = parseFloat(po.lat);
      const lng = parseFloat(po.lng);
      return (
        lat <= region.latitude + region.latitudeDelta / (2 - buffer) &&
        lat >= region.latitude - region.latitudeDelta / (2 - buffer) &&
        lng <= region.longitude + region.longitudeDelta / (2 - buffer) &&
        lng >= region.longitude - region.longitudeDelta / (2 - buffer)
      );
    });
    this.setState({ region: region, currentPos: pos, currentVets: vets });
  }

  onRegionChange(region) {
    //this.setState({ region: region});
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
   * @param {string} connectionType: either 'veteran' or 'po'
   */
  onMarkerPress(connection, connectionType) {
    const coordinate = {
      latitude: connection.lat,
      longitude: connection.lng,
    };
    const mapAnimateDuration = 100;
    const connectBoxAnimateDuration = 200;

    return () => {
      // First need to animate map to current coordinate
      this.mapView &&
        this.mapView.animateToCoordinate(coordinate, mapAnimateDuration);

      // Next also need to show Connect Box for this connection
      this.openConnectBox(connection, connectionType);
    };
  }

  /**
   * Called when the ConnectBox "CONNECT" button is pressed by
   * this user, indicating a friend request sent to the other
   * user.
   * FIXME (Ken): Maybe also include whether user has recv FR from this user
   * so can render instantly that they are now friends.
   */
  onConnectRequest(id) {
    /* Set veteran sent friend request state */
    let veteran = this.getVeteran(id);
    veteran.sent_friend_request = true;
    this.setState({ veterans: this.state.veterans });

    /* Remove any existing friend requests from that user */
    let removeIndex = null;
    this.state.friendRequests.forEach((req, i) => {
      if (req.id === id) {
        removeIndex = i;
      }
    });
    if (removeIndex != null) {
      this.state.friendRequests.splice(removeIndex, 1);
      this.setState({ friendRequests: this.state.friendRequests });
    }
  }

  /**
   * Callback function used by components within this component in order
   * to navigate user to the profile of another veteran or PO.
   * The params are supplied by the subcomponent and consists of the
   * object (veteran or PO) for which the profile page displays. Then, we
   * add additional fields like `source` and `currentVeteran` to indicate
   * additional information that the profile page needs to properly render
   * the fields and buttons.
   *
   * @param params: an object (veteran or PO) supplied by the component
   *                that uses this callback
   */
  navigateToConnectProfile(params) {
    const navParams = update(params, {
      $merge: {
        source: "connect",
        currentVeteran: this.state.sessionUser,
        onConnect: this.onConnectRequest,
      },
    });
    this.props.navigation.navigate("ConnectProfile", navParams);
  }

  /**
   * Renders the help modal, which is static information, and a list
   * of all friend requests sent to this user.
   */
  renderNotifications() {
    return (
      <View style={styles.notificationBox}>
        {this.renderHelpModal()}
        {this.renderFriendRequests()}
      </View>
    );
  }

  /**
   * Renders a help modal with some information when the user first
   * sees the page.
   */
  renderHelpModal() {
    if (this.state.isHelpModalOpen) {
      const user = this.state.sessionUser;
      console.log(this.state.sessionUser, "here");
      return (
        <InfoModal
          title={`WELCOME TO CONNECT, ${user.first_name}!`}
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
          currentVeteran={this.state.sessionUser}
          onClose={this.closeFriendRequestModal(i)}
          showProfile={this.navigateToConnectProfile}
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
    const locations = new Set();
    let currentVets = this.state.currentVets;
    if (this.state.currentVets.length + this.state.currentPos.length > 10) {
      currentVets = this.state.currentVets.slice(
        0,
        10 - this.state.currentPos.length
      );
    }
    return currentVets.map(veteran => {
      const coordinate = {
        latitude: parseFloat(veteran.lat),
        longitude: parseFloat(veteran.lng),
      };
      //Change coordinate if two pins are in the same location
      if (locations.has(coordinate)) {
        coordinate["latitude"] =
          coordinate["latitude"] + this.state.region.latitudeDelta / 20;
      }
      locations.add(coordinate);
      return (
        <MapView.Marker
          coordinate={coordinate}
          onPress={this.onMarkerPress(veteran, "veteran")}
          key={`veteran-${veteran.id}`}
        >
          <ConnectPin pinType="veteran" />
        </MapView.Marker>
      );
    });
  }

  comparePO(a, b) {
    let maxA = 0;
    let maxB = 0;
    a.resources.forEach((req, i) => {
      if (req.num_upvotes > maxA) {
        maxA = req.num_upvotes;
      }
    });
    b.resources.forEach((req, i) => {
      if (req.num_upvotes > maxB) {
        maxB = req.num_upvotes;
      }
    });
    return maxB - maxA;
  }

  /**
   * Return a list of MapView Markers that represent partering orgs.
   * TODO (Ken): See if you can use underscore.js partials instead of
   * rocket function to bind the onPress method
   */
  renderParterOrgMarkers() {
    const locations = new Set();
    let currentPos = this.state.currentPos;
    if (this.state.currentPos.length > 10) {
      currentPos.sort(comparePO);
      currentPos = currentPos.slice(0, 10);
    }
    return currentPos.map(org => {
      const coordinate = {
        latitude: parseFloat(org.lat),
        longitude: parseFloat(org.lng),
      };
      //Move pins that have same location
      if (locations.has(coordinate)) {
        coordinate["latitude"] =
          coordinate["latitude"] + this.state.region.latitudeDelta / 20;
      }
      locations.add(coordinate);

      return (
        <MapView.Marker
          coordinate={coordinate}
          onPress={this.onMarkerPress(org, "po")}
          key={`parterOrg-${org.id}`}
        >
          <ConnectPin pinType="parterOrg" />
        </MapView.Marker>
      );
    });
  }

  renderConnectBox() {
    return this.state.activeConnection ? (
      <ConnectBox
        connection={this.state.activeConnection}
        connectionType={this.state.activeConnectionType}
        onClose={this.closeConnectBox}
        onConnect={this.onConnectRequest}
        currentVeteran={this.state.sessionUser}
        showProfile={this.navigateToConnectProfile}
      />
    ) : null;
  }

  /**
   * If the user has not signed up for connect yet, then this will
   * render in place of the Connect map, directing the user to sign
   * up first.
   */
  renderConnectSignUp() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={styles.backgroundImg}
          source={require("../../assets/images/map.jpg")}
        />
        <View style={styles.backgroundOverlay}>
          <View style={styles.contentContainer}>
            <Text style={styles.subtitleText}>Get started with</Text>
            <Text style={styles.titleText}>Veterans 360 Connect</Text>
            <View
              style={{
                marginTop: 20,
                flex: 1,
                marginBottom: 60,
                alignItems: "center",
              }}
            >
              <View style={styles.tile}>
                <View style={styles.tileIcon}>
                  <Icon name="map-marker" size={50} color={"#18B671"} />
                </View>
                <View style={styles.tileText}>
                  <Text style={styles.tileTitleText}>EXPLORE</Text>
                  <Text style={styles.bodyText}>
                    veterans and partnered veteran organizations around your
                    area.
                  </Text>
                </View>
              </View>
              <View style={styles.line} />
              <View style={styles.tile}>
                <View style={styles.tileIcon}>
                  <Icon name="users" size={50} color={"#18B671"} />
                </View>
                <View style={styles.tileText}>
                  <Text style={styles.tileTitleText}>CONNECT</Text>
                  <Text style={styles.bodyText}>
                    with other veterans like you and get in touch.
                  </Text>
                </View>
              </View>
              <View style={styles.line} />
              <View style={styles.tile}>
                <View style={styles.tileIcon}>
                  <Icon name="calendar-check-o" size={50} color={"#18B671"} />
                </View>
                <View style={styles.tileText}>
                  <Text style={styles.tileTitleText}>STAY UP TO DATE</Text>
                  <Text style={styles.bodyText}>
                    with every new event and resource created by your
                    connections.
                  </Text>
                </View>
              </View>
            </View>
            <TouchableHighlight
              onPress={() => {
                this.navigateToSignUp();
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  render() {
    // if (this.state.stillLoading) {
    //   return <View />;
    // } else if (!this.state.onConnect) {
    //   return this.renderConnectSignUp();
    // }
    if (!this.state.sessionUser) return null;

    return (
      <View style={styles.baseContainer}>
        {this.renderNotifications()}
        <MapView
          ref={ref => (this.mapView = ref)}
          style={styles.baseMapContainer}
          initialRegion={this.getInitialRegion()}
          onRegionChangeComplete={this.onRegionChangeComplete}
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
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  baseMapContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImg: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  contentContainer: {
    position: "absolute",
    top: 40,
    bottom: 40,
    left: 40,
    right: 40,
  },
  notificationBox: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    margin: 10,
    marginTop: 30,
    zIndex: 100,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "source-sans-pro-semibold",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 24,
    fontFamily: "source-sans-pro-light",
    textAlign: "center",
  },
  bodyText: {
    fontSize: 12,
    fontFamily: "source-sans-pro-regular",
  },
  tileTitleText: {
    fontFamily: "source-sans-pro-bold",
    fontSize: 12,
    color: "#949494",
  },
  tile: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 3,
    shadowColor: "black",
    shadowOpacity: 0.05,
    shadowOffset: { width: 5, height: 10 },
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  line: {
    flex: 2,
    width: 2,
    backgroundColor: "#18B671",
  },
  tileIcon: {
    flex: 1,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tileText: {
    flex: 3,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "source-sans-pro-bold",
    fontSize: 20,
    color: "#ffffff",
  },
  button: {
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    marginRight: 60,
    marginLeft: 60,
    backgroundColor: "#18B671",
  },
});
