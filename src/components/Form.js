import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { colors } from '../styles/colors';
import t from 'tcomb-form-native';
const TForm = t.form.Form;

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.overrideStyles();
  }

  /**
   * Overrides default styles from form library.
   *
   * To override more defaults refer to the master stylesheet here:
   * https://github.com/gcanti/tcomb-form-native/blob/master/lib/stylesheets/bootstrap.js
   */
  overrideStyles() {
    let stylesheet = t.form.Form.stylesheet;

    const FONT_SIZE = 15;
    const HEIGHT = 40;
    const INPUT_COLOR = colors.charcoal;
    const PADDING_HORIZONTAL = 15;

    const LABEL_FONT_SIZE = 15;
    const LABEL_COLOR = colors.charcoal
    const LABEL_FONT_WEIGHT = 'bold';

    // Textbox styles
    let textbox = stylesheet.textbox;
    textbox.normal = {
      color: INPUT_COLOR,
      backgroundColor: colors.snow,
      fontSize: FONT_SIZE,
      height: HEIGHT,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: PADDING_HORIZONTAL,
      borderRadius: HEIGHT / 2,
      borderColor: colors.light_gray,
      borderWidth: 1,
      marginBottom: 5,
    }

    textbox.error = {
      color: INPUT_COLOR,
      backgroundColor: colors.snow,
      fontSize: FONT_SIZE,
      height: HEIGHT,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: PADDING_HORIZONTAL,
      borderRadius: HEIGHT / 2,
      borderColor: colors.red,
      borderWidth: 1,
      marginBottom: 5,
    }

    textbox.notEditable = {
      color: INPUT_COLOR,
      backgroundColor: colors.light_gray,
      fontSize: FONT_SIZE,
      height: HEIGHT,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: PADDING_HORIZONTAL,
      borderRadius: HEIGHT / 2,
      borderColor: colors.light_charcoal,
      borderWidth: 1,
      marginBottom: 5,
    }

    // Label styles
    let label = stylesheet.controlLabel;
    label.normal = {
      color: LABEL_COLOR,
      fontSize: LABEL_FONT_SIZE,
      marginBottom: 7,
      fontWeight: LABEL_FONT_WEIGHT,
      letterSpacing: 0.5,
    }

    label.error = {
      color: colors.red,
      fontSize: LABEL_FONT_SIZE,
      marginBottom: 7,
      fontWeight: LABEL_FONT_WEIGHT,
      letterSpacing: 0.5,
    }
  }

  render() {
    return (
      <TForm
        style={[styles.formStyle, this.props.style]}
        ref={this.props.refCallback}
        type={this.props.type}
        options={this.props.options}
      />
    );
  }
}


const styles = StyleSheet.create({
  formStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export { Form, t };
