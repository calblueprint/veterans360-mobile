import { Navigation } from 'react-native-navigation';

import TestScreen from './TestScreen';


export function registerScreens() {
  Navigation.registerComponent('test.TestScreen', () => TestScreen);
}
