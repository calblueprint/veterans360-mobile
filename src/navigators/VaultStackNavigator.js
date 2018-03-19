import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import Resource from '../components/Resource.js';
import VaultScreen from '../screens/VaultScreen';
import PdfScreen from '../screens/PdfScreen';

const VaultStackNavigator = StackNavigator({
  Vault: {
    screen: VaultScreen,
    navigationOptions: ({ navigation }) => ({
		title: "Vault",
	}),
  },
  Resource: {
    screen: Resource,
    navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
        tabBarVisible: false,
      })
  },
  Pdf: {
    screen: PdfScreen,
  },
}, {
  initialRouteName: 'Vault',
});

export default VaultStackNavigator;