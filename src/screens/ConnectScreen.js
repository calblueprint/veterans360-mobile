import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';

export default class ConnectScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      region: this.getInitialState(),
      isHelpModalOpen: false,
    }

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  getInitialState() {
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

  render() {
    return (
      <View style={styles.baseContainer}>
        <MapView
          style={styles.baseMapContainer}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
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
