import React from "react";
import { createStackNavigator } from "react-navigation";
import Resource from "../components/Resource.js";
import VaultScreen from "../screens/VaultScreen";
import PdfScreen from "../screens/PdfScreen";

const VaultStackNavigator = createStackNavigator(
  {
    Vault: {
      screen: VaultScreen
    },
    Resource: {
      screen: Resource,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    Pdf: {
      screen: PdfScreen
    }
  },
  {
    initialRouteName: "Vault"
  }
);

export default VaultStackNavigator;
