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
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { colors } from '../styles/colors';
import HomeStackNavigator from '../navigators/HomeStackNavigator';
import ConnectSignUpStackNavigator from '../navigators/ConnectSignUpStackNavigator';
import VaultStackNavigator from '../navigators/VaultStackNavigator';

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
    screen: ResponseScreen,
    navigationOptions: {
      tabBarLabel: 'Response',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="file-o" size={21} color={tintColor} />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={22} color={tintColor} />
      ),
    },
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Edit Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={22} color={tintColor} />
      ),
    },
  },

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
