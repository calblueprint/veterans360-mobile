import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import InfoModal from '../components/InfoModal';

export default class ConnectScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHelpModalOpen: true,
    }

    this.onRegionChange = this.onRegionChange.bind(this);
    this.closeHelpModal = this.closeHelpModal.bind(this);
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

  renderHelpModal() {
    if (this.state.isHelpModalOpen) {
      return (
        <InfoModal
          title="yes this is it"
          text="this is the body text"
          onClose={this.closeHelpModal}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.baseContainer}>
        {this.renderHelpModal()}
        <MapView
          style={styles.baseMapContainer}
          initialRegion={this.getInitialRegion()}
        />
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
