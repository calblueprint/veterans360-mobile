import React from 'react';
import { StackNavigator } from 'react-navigation';
import ResourceScreen from '../screens/ResourceScreen';
import VaultScreen from '../screens/VaultScreen';

const VaultStackNavigator = StackNavigator({
  Vault: {
    screen: VaultScreen,
  },
  Resource: {
    screen: ResourceScreen,
  }
}, {
  initialRouteName: 'Vault',
  headerMode: 'none',
});

export default VaultStackNavigator;
