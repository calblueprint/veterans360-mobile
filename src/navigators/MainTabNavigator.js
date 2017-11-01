import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ConnectScreen from '../screens/ConnectScreen';
import VaultScreen from '../screens/VaultScreen';
import ResponseScreen from '../screens/ResponseScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../styles/colors';


const MainTabNavigator = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={25} color={colors.green} />
      ),
    },
  },
  Connect: {
    screen: ConnectScreen,
    navigationOptions: {
      tabBarLabel: 'Connect',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="users" size={20} color={colors.green} />
      ),
    },
  },
  Vault: {
    screen: VaultScreen,
    navigationOptions: {
      tabBarLabel: 'Vault',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="briefcase" size={22} color={colors.green} />
      ),
    },
  },
  Response: {
    screen: ResponseScreen,
    navigationOptions: {
      tabBarLabel: 'Response',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="file-o" size={21} color={colors.green} />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={22} color={colors.green} />
      ),
    },
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.green,
  }
});

export default MainTabNavigator;
