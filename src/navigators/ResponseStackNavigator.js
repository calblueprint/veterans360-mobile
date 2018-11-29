import React from "react";
import { createStackNavigator } from "react-navigation";
import Resource from "../components/Resource.js";
import ResponseScreen from "../screens/ResponseScreen";
import PdfScreen from "../screens/PdfScreen";

const ResponseStackNavigator = createStackNavigator(
  {
    Response: {
      screen: ResponseScreen
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
    initialRouteName: "Response"
  }
);

export default ResponseStackNavigator;
