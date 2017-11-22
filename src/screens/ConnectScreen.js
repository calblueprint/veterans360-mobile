import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import InfoModal from '../components/InfoModal';
import ConnectPin from '../components/ConnectPin';
import ConnectBox from '../components/ConnectBox';
import { StyleSheet, Text, View, Modal } from 'react-native';

export default class ConnectScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHelpModalOpen: true,
      veterans: this.getVeterans(),
      parterOrgs: this.getParterOrgs(),
      activeConnection: null,  // Indicates if a veteran/org has been focused
    }

    this.onRegionChange = this.onRegionChange.bind(this);
    this.closeHelpModal = this.closeHelpModal.bind(this);
    this.closeConnectBox = this.closeConnectBox.bind(this);
  }

  /**
   * Placeholder until backend data is collected.
   */
  getVeterans() {
    return [
      {
        id: 15,
        name: 'Ken Chen',
        roles: ['veteran', 'caretaker'],
        email: 'kenchen@berkeley.edu',
        bio: 'Hi! I am a former Signal Corps officer currently residing in Berkeley, CA. Looking for assistance with finaces and benefits.',
        lat: 37.78825,
        lng: -122.4324,
      },
      {
        id: 16,
        name: 'James Chen',
        roles: ['family_member'],
        email: 'kenchen@berkeley.edu',
        bio: 'Hi! I am a former Signal Corps officer currently residing in Berkeley, CA. Looking for assistance with finaces and benefits.',
        lat: 37.77825,
        lng: -122.4123,
      },
      {
        id: 17,
        name: 'Sarah Chen',
        roles: ['combat_veteran', 'post_911'],
        email: 'kenchen@berkeley.edu',
        bio: 'Hi! I am a former Signal Corps officer currently residing in Berkeley, CA. Looking for assistance with finaces and benefits.',
        lat: 37.78240,
        lng: -122.4344,
      },
      {
        id: 18,
        name: 'Alice Chen',
        roles: ['combat_veteran', 'caretaker'],
        email: 'kenchen@berkeley.edu',
        bio: 'Hi! I am a former Signal Corps officer currently residing in Berkeley, CA. Looking for assistance with finaces and benefits.',
        lat: 37.78434,
        lng: -122.4354,
      },
    ]
  }

  /**
   * Placeholder until backend data is collected.
   */
  getParterOrgs() {
    return [
      {
        id: 15,
        name: 'Veterans 360',
        email: 'kenchen@berkeley.edu',
        lat: 37.78354,
        lng: -122.4224,
      },
    ]
  }

  openHelpModal() {
    this.setState({ isHelpModalOpen: true });
  }

  closeHelpModal() {
    this.setState({ isHelpModalOpen: false });
  }

  openConnectBox(connection) {
    this.setState({ activeConnection: connection });
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

  /**
   * Return a list of MapView Markers that represent veterans.
   * TODO (Ken): See if you can use underscore.js partials instead of
   * rocket function to bind the onPress method
   */
  renderVeteranMarkers() {
    return this.state.veterans.map((veteran) => {
      const coordinate = {
        latitude: veteran.lat,
        longitude: veteran.lng,
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
        latitude: org.lat,
        longitude: org.lng,
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
        onClose={this.closeConnectBox}/>
    ) : null;
  }

  render() {
    return (
      <View style={styles.baseContainer}>
        {this.renderHelpModal()}
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
  }
});
