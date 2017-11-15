import React from 'react';
import { Animated, Easing } from 'react-native';

class Animations {

  static USE_NATIVE_DRIVER() {
    return true;
  }

  /**
   * Simple fade animation.
   *
   * @param {Animated.value} opacity: animated value object for opacity
   * @param {integer} toValue: end value for opacity
   * @param {integer} duration: millisecond animation duration
   */
  static fade(opacity, toValue = 0, duration = 300) {
    return Animated.timing(opacity, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: this.USE_NATIVE_DRIVER(),
    });
  }

  /**
   * Simple translate animation. Use interpolation if this is in conjunction
   * with another animation.
   *
   * @param {Animated.value} position: animated value object for position
   * @param {integer} toX: end value for translation X
   * @param {integer} toY: end value for translation Y
   * @param {integer} duration: millisecond animation duration
   */
  static translate(position, toX = 0, toY = 0, duration = 300) {
    return Animated.timing(position, {
      toValue: { x: toX, y: toY },
      duration: duration,
      useNativeDriver: this.USE_NATIVE_DRIVER(),
    });
  }

  static bounce(scale, toValue = 1.1, duration = 200) {
    return Animated.spring(scale, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: this.USE_NATIVE_DRIVER(),
    });
  }
}

export default Animations;
