/**
 * Navigator that controls the HomeScreen and a profile
 * screen that is used to show other veteran profiles.
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';


const HomeStackNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  HomeProfile: {
    screen: ProfileScreen,
  },
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
});

export default HomeStackNavigator;
