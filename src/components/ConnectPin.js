/**
 * Connect Pin component that renders a basic profile
 * image of the user to be used as MapView.Marker custom view.
 *
 * @prop pinType        - either "veteran" or "parterOrg"
 * @prop branch           - role of the veteran(po if parterOrg)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';

export default class ConnectPin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderPin() {
    return this.props.pinType == 'parterOrg' ? (
      <Image
        source={require('../../assets/images/pin-green.png')}
        style={styles.pin}
      />
    ) : this.props.branch == 'Army' ? (
      <Image
        source={require('../../assets/images/pin-darkgreen.png')}
        style={styles.pin}
      />
    ) : this.props.branch == 'Navy' ? (
      <Image
        source={require('../../assets/images/pin-blue.png')}
        style={styles.pin}
      />
    ) : this.props.branch == 'Marines' ? (
      <Image
        source={require('../../assets/images/pin-purple.png')}
        style={styles.pin}
      />
    ) : this.props.branch == 'Air_Force' ? (
      <Image
        source={require('../../assets/images/pin-red.png')}
        style={styles.pin}
      />
    ) : this.props.branch == 'Coast_Guard' ? (
      <Image
        source={require('../../assets/images/pin-cyan.png')}
        style={styles.pin}
      /> 
    ) :  (
      <Image
        source={require('../../assets/images/pin-white.png')}
        style={styles.pin}
      />
    );
  }

  render() {
    return (
      <View
        style={[styles.baseContainer]}
      >
        {this.renderPin()}
        <Image
          source={require('../../assets/images/photogenic.jpg')}
          style={styles.image}
        />
      </View>
    );
  }
}

ConnectPin.propTypes = {
  pinType: PropTypes.oneOf(['veteran', 'parterOrg']).isRequired,
  branch: PropTypes.string.isRequired
};

/* Change these as you see fit */
const properties = {
  pinHeight: 80,
  imageMargin: 4,
};

const styles = StyleSheet.create({
  baseContainer: {
    height: properties.pinHeight,
    width: properties.pinHeight * 0.75,
  },
  pin: {
    height: properties.pinHeight,
    width: properties.pinHeight * 0.75,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: properties.pinHeight * 0.75 - 2 * properties.imageMargin,
    height: properties.pinHeight * 0.75 - 2 * properties.imageMargin,
    margin: properties.imageMargin,
    borderRadius: 0.5 * (properties.pinHeight * 0.75 - 2 * properties.imageMargin),
    zIndex: 100,
  },
});
