import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import update from 'immutability-helper';

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

    this.onConnectRequest = this.onConnectRequest.bind(this);
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

  onConnectRequest(i) {
    const newVeterans = update(this.state.veterans, {
      [i]: {
        sent_friend_request: { $set: true },
      },
    });
    this.setState({ veterans: newVeterans });
  }

  render() {
    const currentVeteran = this.props.navigation.state.params;

    return (
      <ScrollView>
        <View style={styles.baseContainer}>
          <ProfileGallery
            veterans={this.state.veterans}
            currentVeteran={currentVeteran}
            onConnect={this.onConnectRequest}
          />
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
