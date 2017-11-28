import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Font } from 'expo';
import { colors } from './colors';

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

const fontStyles = StyleSheet.create({
  mainHeader: {
    fontSize: 32,
    fontFamily: 'source-sans-pro-bold',
    color: colors.charcoal,
  },
  mainHeaderWhite: {
    fontSize: 32,
    fontFamily: 'source-sans-pro-bold',
    color: colors.white,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'source-sans-pro-bold',
    letterSpacing: 1,
    color: colors.light_charcoal,
  },
  emphasisText: {
    fontSize: 18,
    fontFamily: 'source-sans-pro-semibold-italic',
    color: colors.gray,
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'source-sans-pro-bold', 
    color: colors.charcoal,
  },
  boldTextWhite: {
    fontSize: 18,
    fontFamily: 'source-sans-pro-bold',
    color: colors.white,
  },
  bodyText: {
    fontSize: 18,
    fontFamily: 'source-sans-pro-regular',
    color: colors.charcoal,
  },
});

export { loadFonts, fontStyles };
