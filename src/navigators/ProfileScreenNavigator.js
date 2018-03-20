/**
 * Navigator that controls the Profile and EditProfile Screen
 */

import React from 'react';
import { StackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';


const ProfileScreenNavigator = StackNavigator({
  Profile: {
    screen: ProfileScreen,
  },
  EditProfileScreen: {
    screen: EditProfileScreen,
  },
 {
  initialRouteName: 'Profile',
  headerMode: 'none',
});

export default ProfileScreenNavigator;
