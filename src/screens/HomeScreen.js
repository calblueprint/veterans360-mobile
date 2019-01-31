import React from "react";
import Icon from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import update from "immutability-helper";

import { imageStyles } from "../styles/images";
import { layoutStyles } from "../styles/layout";
import { fontStyles } from "../styles/fonts";
import { APIRoutes } from "../helpers/routes/routes";
import { colors } from "../styles/colors";
import BaseRequester from "../helpers/requesters/BaseRequester";
import ProfileGallery from "../components/ProfileGallery";
import BackgroundOverlay from "../components/BackgroundOverlay";
import ResourceCard from "../components/ResourceCard";
import CategoryRequester from "../helpers/requesters/CategoryRequester";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      veterans: [],
      categories: [],
      resources: [],
      stillLoading: true,
    };

    this.onConnectRequest = this.onConnectRequest.bind(this);
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }

  async componentDidMount() {
    console.log(this.props.navigation.state.params);
    await this.getVeterans();
    await this.getRecentResources();
  }

  /**
   * Gets all veterans from the server and sets state once retrieved.
   * TODO (Ken): currently a placeholer and retrieves all
   * veterans
   */
  async getVeterans() {
    const route = APIRoutes.veteransPath();
    let json, headers;
    try {
      ({ json, headers } = await BaseRequester.get(route));
      this.setState({ veterans: json });
    } catch (error) {
      console.error(error);
      return;
    }
  }

  /** Disable for now. Get recent resources */
  async getRecentResources() {
    let endpoint = APIRoutes.homeResources();
    let json, headers;
    try {
      ({ json, headers } = await BaseRequester.get(endpoint));
      console.log(json);
      this.setState({ resources: json });
    } catch (error) {
      console.error(error);
      return;
    }
  }

  /**
   * Passed down and called by the ProfileCard when
   * the connect button is pressed so that it updates
   * the state of the i-th veteran in this state to
   * have sent the friend request.
   *
   * @param {integer} i: the i-th veteran to update
   */
  onConnectRequest(i) {
    const newVeterans = update(this.state.veterans, {
      [i]: {
        sent_friend_request: { $set: true },
      },
    });
    this.setState({ veterans: newVeterans });
  }

  navigateToProfile(params) {
    this.props.navigation.navigate("HomeProfile", params);
  }

  /**
   * TODO (Claire): You can return all your stuff here
   */
  renderResources() {
    return this.state.resources.map(item => {
      return (
        <View>
          <ResourceCard
            resource_id={item.id}
            resource_description={item.description}
            resource_partneringOrg_name={item.owner.name}
            resource_partneringOrg_description={item.owner.description}
            resource_upvotes={item.num_upvotes}
            resource_category={item.category}
            resource_file_link={item.file.url}
            resource_veteran_has_upvoted={item.veteran_has_upvoted}
            veteran_id={this.props.navigation.state.params.id}
          />
        </View>
      );
    });
  }

  render() {
    const currentVeteran = this.props.navigation.getParam("veteran", {});

    return (
      <BackgroundOverlay
        style={styles.baseContainer}
        color={colors.light_steel}
        bottom="70%"
      >
        <ScrollView>
          <View style={styles.welcomeContainer}>
            <Text style={fontStyles.welcomeHeader}>{`Welcome back`}</Text>
          </View>
          <View style={styles.profileGalleryContainer}>
            <ProfileGallery
              veterans={this.state.veterans}
              currentVeteran={currentVeteran}
              onConnect={this.onConnectRequest}
              showProfile={this.navigateToProfile}
            />
          </View>
          {this.renderResources()}
        </ScrollView>
      </BackgroundOverlay>
    );
  }
}

const styles = StyleSheet.create({
  /* Container for the entire screen */
  baseContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  /* Container for the welcome text */
  welcomeContainer: {
    margin: 20,
    marginTop: 40,
    marginBottom: 0,
    backgroundColor: "transparent",
  },

  profileGalleryContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  /* Individual items */
});
