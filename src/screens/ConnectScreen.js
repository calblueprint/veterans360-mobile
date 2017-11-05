import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import InfoModal from '../components/InfoModal';
import ConnectPin from '../components/ConnectPin';

export default class ConnectScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHelpModalOpen: true,
      veterans: this.getVeterans(),
      parterOrgs: this.getParterOrgs(),
    }

    this.onRegionChange = this.onRegionChange.bind(this);
    this.closeHelpModal = this.closeHelpModal.bind(this);
  }

  /**
   * Placeholder until backend data is collected.
   */
  getVeterans() {
    return [
      {
        id: 15,
        first_name: 'Ken',
        last_name: 'Chen',
        roles: [1, 2],
        email: 'kenchen@berkeley.edu',
        lat: 37.78825,
        lng: -122.4324,
      },
      {
        id: 16,
        first_name: 'James',
        last_name: 'Chen',
        roles: [1, 2, 3],
        email: 'kenchen@berkeley.edu',
        lat: 37.77825,
        lng: -122.4123,
      },
      {
        id: 17,
        first_name: 'Sarah',
        last_name: 'Chen',
        roles: [1, 2, 4, 5],
        email: 'kenchen@berkeley.edu',
        lat: 37.78240,
        lng: -122.4344,
      },
      {
        id: 18,
        first_name: 'Alice',
        last_name: 'Chen',
        roles: [1],
        email: 'kenchen@berkeley.edu',
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

  animateToPin(coordinate, duration = 200) {
    this.mapView && this.mapView.animateToCoordinate(coordinate, duration);
  }

  renderHelpModal() {
    if (this.state.isHelpModalOpen) {
      return (
        <InfoModal
          title="WELCOME TO CONNECT!"
          text="Pan the map around to see who's around you."
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
          onPress={() => {this.animateToPin(coordinate)}}
          title={`${veteran.first_name} ${veteran.last_name}`}
          description={veteran.email}
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
          onPress={() => {this.animateToPin(coordinate)}}
          title={org.name}
          description={org.email}
          key={`parterOrg-${org.id}`}
        >
          <ConnectPin pinType="parterOrg" />
        </MapView.Marker>
      );
    })
  }

  render() {
    return (
      <View style={styles.baseContainer}>
        {this.renderHelpModal()}
        <MapView
          ref={(ref) => this.mapView = ref}
          style={styles.baseMapContainer}
          initialRegion={this.getInitialRegion()}
          provider={PROVIDER_GOOGLE}
        >
          {this.renderVeteranMarkers()}
          {this.renderParterOrgMarkers()}
        </MapView>
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
