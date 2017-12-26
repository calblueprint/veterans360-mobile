import React, { Component } from 'react';
import { Font } from 'expo';
import { imageStyles } from '../styles/images';
import { layoutStyles, margins } from '../styles/layout';
import { View, Button, Linking } from 'react-native';
import { Constants, WebBrowser } from 'expo';

export default class ResourceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handlePressButton = async () => {
    let result = await WebBrowser.openBrowserAsync(this.props.navigation.state.params.link);
  };

  render() {
    return (
      <View>
        <Button
          title="Open File"
          onPress={this._handlePressButton}
        />
      </View>
    );
  }
}
