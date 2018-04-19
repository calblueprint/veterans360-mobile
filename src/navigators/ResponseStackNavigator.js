import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import Resource from '../components/Resource.js';
import ResponseScreen from '../screens/ResponseScreen';
import PdfScreen from '../screens/PdfScreen';

const ResponseStackNavigator = StackNavigator({
  Response: {
    screen: ResponseScreen,
  },
  Resource: {
    screen: Resource,
    navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
      })
  },
  Pdf: {
    screen: PdfScreen,
  },
}, {
  initialRouteName: 'Response',
});

export default ResponseStackNavigator;