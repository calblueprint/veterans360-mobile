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
import { fontStyles } from '../styles/fonts';
import { APIRoutes } from '../helpers/routes/routes';
import { colors } from '../styles/colors';
import BaseRequester from '../helpers/requesters/BaseRequester';
import ProfileGallery from '../components/ProfileGallery';
import BackgroundOverlay from '../components/BackgroundOverlay';


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
      <BackgroundOverlay
        style={styles.baseContainer}
        color={colors.light_steel}
        bottom="80%"
      >
        <ScrollView>
          <View style={styles.welcomeContainer}>
            <Text style={fontStyles.welcomeHeader}>
              {`Welcome back, ${currentVeteran.first_name}!`}
            </Text>
          </View>
          <ProfileGallery
            veterans={this.state.veterans}
            currentVeteran={currentVeteran}
            onConnect={this.onConnectRequest}
          />
        </ScrollView>
      </BackgroundOverlay>
    );
  }

}

const styles = StyleSheet.create({
  /* Container for the entire screen */
  baseContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  /* Container for the welcome text */
  welcomeContainer: {
    margin: 20,
    marginTop: 40,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },

  /* Individual items */
});
