/**
 * Navigator that controls the Profile and EditProfile Screen
 */
import { createStackNavigator } from "react-navigation";

import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const ProfileScreenNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen
    },
    EditProfile: {
      screen: EditProfileScreen
    }
  },
  {
    initialRouteName: "Profile",
    headerMode: "none"
  }
);

export default ProfileScreenNavigator;
