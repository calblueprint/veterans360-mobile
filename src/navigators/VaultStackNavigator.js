import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import Resource from '../components/Resource.js';
import VaultScreen from '../screens/VaultScreen';

const VaultStackNavigator = StackNavigator({
  Vault: {
    screen: VaultScreen,
  },
  Resource: {
    screen: Resource,
  },
}, {
  initialRouteName: 'Vault',
  headerMode: 'none',
});

export default VaultStackNavigator;