import React from 'react';
import { Animated } from 'react-native';

class Animations {

  /**
   * Simple fade animation.
   *
   * @param {Animated.value} opacity: animated value object for opacity
   * @param {integer} toValue: end value for opacity
   * @param {integer} duration: millisecond animation duration
   */
  static fadeAnimation(opacity, toValue = 0, duration = 500) {
    return Animated.timing(opacity, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    });
  }
}

export default Animations;
