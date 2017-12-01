import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import { APIRoutes } from '../helpers/routes/routes';
import BaseRequester from '../helpers/requesters/BaseRequester';
import ProfileGallery from '../components/ProfileGallery';


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      veterans: [],
    };
  }

  componentDidMount() {
    this.getVeterans();
  }

  /**
   * Gets all veterans from the server and sets state once retrieved.
   * TODO (Ken): currently a placeholer and retrieves all
   * veterans
   */
  getVeterans() {
    const route = APIRoutes.veteransPath();
    BaseRequester.get(route).then((response) => {
      this.setState({ veterans: response });
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    const currentVeteran = this.props.navigation.state.params;
    
    return (
      <View style={layoutStyles.flexCenter}>
        <ProfileGallery
          veterans={this.state.veterans}
          currentVeteran={currentVeteran}
        />
      </View>
    );
  }

}
