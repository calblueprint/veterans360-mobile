import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, TextInput, View, ScrollView, TouchableHighlight } from 'react-native';
import { Font } from 'expo';
import Icon from '@expo/vector-icons/FontAwesome';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';

async function loadFonts() {
      return await Font.loadAsync({
            'source-sans-pro-black': require('../.././assets/fonts/SourceSansPro-Black.ttf'),
            'source-sans-pro-black-italic': require('../.././assets/fonts/SourceSansPro-BlackItalic.ttf'),
            'source-sans-pro-bold': require('../.././assets/fonts/SourceSansPro-Bold.ttf'),
            'source-sans-pro-bold-italic': require('../.././assets/fonts/SourceSansPro-BoldItalic.ttf'),
            'source-sans-pro-extra-light': require('../.././assets/fonts/SourceSansPro-ExtraLight.ttf'),
            'source-sans-pro-extra-light-italic': require('../.././assets/fonts/SourceSansPro-ExtraLightItalic.ttf'),
            'source-sans-pro-italic': require('../.././assets/fonts/SourceSansPro-Italic.ttf'),
            'source-sans-pro-light': require('../.././assets/fonts/SourceSansPro-Light.ttf'),
            'source-sans-pro-light-italic': require('../.././assets/fonts/SourceSansPro-LightItalic.ttf'),
            'source-sans-pro-regular': require('../.././assets/fonts/SourceSansPro-Regular.ttf'),
            'source-sans-pro-semibold': require('../.././assets/fonts/SourceSansPro-SemiBold.ttf'),
            'source-sans-pro-semibold-italic': require('../.././assets/fonts/SourceSansPro-SemiBoldItalic.ttf'),
      });
}

export { loadFonts };