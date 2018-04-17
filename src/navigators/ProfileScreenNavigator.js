/**
 * Navigator that controls the Profile and EditProfile Screen
 */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const ProfileScreenNavigator = StackNavigator({
  ProfileScreen: {
    screen: ProfileScreen,
  },
  EditProfile: {
    screen: EditProfileScreen,
  },
}, {
  initialRouteName: 'ProfileScreen',
  headerMode: 'none',
  navigationOptions: {
      gesturesEnabled: false,
    },
});

export default ProfileScreenNavigator;
