import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ConnectScreen from '../screens/ConnectScreen';
import VaultScreen from '../screens/VaultScreen';
import ResponseScreen from '../screens/ResponseScreen';
import ProfileScreen from '../screens/ProfileScreen';


const MainTabNavigator = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={25} color="#e91e63" />
      ),
    },
  },
  Connect: {
    screen: ConnectScreen,
  },
  Vault: {
    screen: VaultScreen,
  },
  Response: {
    screen: ResponseScreen,
  },
  Profile: {
    screen: ProfileScreen,
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  }
});

export default MainTabNavigator;
