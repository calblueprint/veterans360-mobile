/**
 * Navigator controls the main 5 pages of the application: Home, Connect,
 * Vault, Profile, and Responses.
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ConnectScreen from '../screens/ConnectScreen';
import VaultScreen from '../screens/VaultScreen';
import ResponseScreen from '../screens/ResponseScreen';
import ProfileScreenNavigator from '../navigators/ProfileScreenNavigator';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { colors } from '../styles/colors';
import HomeStackNavigator from '../navigators/HomeStackNavigator';
import ConnectSignUpStackNavigator from '../navigators/ConnectSignUpStackNavigator';
import VaultStackNavigator from '../navigators/VaultStackNavigator';
import ResponseStackNavigator from '../navigators/ResponseStackNavigator';

const MainTabNavigator = TabNavigator({
  Home: {
    screen: HomeStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={25} color={tintColor} />
      ),
    },
  },
  Connect: {
    screen: ConnectSignUpStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Connect',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="users" size={20} color={tintColor} />
      ),
    },
  },
  Vault: {
    screen: VaultStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Vault',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="briefcase" size={22} color={tintColor} />
      ),
    },
  },
  Response: {
    screen: ResponseStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Response',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="exclamation-circle" size={21} color={tintColor} />
      ),
    },
  },
  Profile: {
    screen: ProfileScreenNavigator,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={22} color={tintColor} />
      ),
    },
  },
  // EditProfile: {
  //   screen: EditProfileScreen,
  //   navigationOptions: {
  //     tabBarLabel: 'Settings',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="user" size={22} color={tintColor} />
  //     ),
  //   },
  // },

}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.green,
  },
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default MainTabNavigator;
