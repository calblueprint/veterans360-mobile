/**
 * Signup screen for veterans.

 * Basically a container for a sign up form with helpers to
 * send data back to the API, receive validations, and then render
 * any errors. See Form documentation for usage of form and data types.
 *
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Image } from 'react-native';
import { Form, t } from '../components/Form';

import { imageStyles } from '../styles/images';
import { layoutStyles, margins } from '../styles/layout';
import { colors } from '../styles/colors';
import LoginRequester from '../helpers/requesters/LoginRequester';
import BackgroundOverlay from '../components/BackgroundOverlay';
import RaisedContainer from '../components/RaisedContainer';
import Button from '../components/Button';
// import PhotoUpload from 'react-native-photo-upload'


export default class SignupScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formValues: this.getInitialFormValues(),
      errors: {},  // Set and reset by signUp if any errors occurred
    };

    this.onFormChange = this.onFormChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.navigateToLoginScreen = this.navigateToLoginScreen.bind(this);
  }

  getInitialFormValues() {
    return {
      firstName: 'Ken',
      lastName: 'Chen',
      email: 'lbkchen@gmail.com',
      password: 'password',
      confirmPassword: 'password'
    };
  }

  getFormType() {
    return t.struct({
      firstName: t.String,
      lastName: t.String,
      email: t.String,
      password: t.String,
      confirmPassword: t.String,
      description: t.String,
      activeDuty: t.Boolean,
      veteran: t.Boolean,
      post_911: t.Boolean,
      familyMember: t.Boolean,
      caregiver: t.Boolean,
      other: t.Boolean,
    });
  }

  getFormOptions() {
    return {
      fields: {
        firstName: {
          hasError: !!this.state.errors.first_name,
          error: this.state.errors.first_name,
        },
        lastName: {
          hasError: !!this.state.errors.last_name,
          error: this.state.errors.last_name,
        },
        email: {
          type: 'email',
          hasError: !!this.state.errors.email,
          error: this.state.errors.email,
        },
        description: {
          hasError: !!this.state.errors.first_name,
          error: this.state.errors.first_name,
        },
        password: {
          password: true,
          secureTextEntry: true,
          hasError: !!this.state.errors.password,
          error: this.state.errors.password,
        },
        confirmPassword: {
          password: true,
          secureTextEntry: true,
          hasError: !!this.state.errors.password_confirmation,
          error: this.state.errors.password_confirmation,
        },
      },
    };

    this.signUp = this.signUp.bind(this);
    this.navigateToLoginScreen = this.navigateToLoginScreen.bind(this);
  }

  /**
   * Sets the errors state from errors, which is a dictionary mapping from
   * field name to a list of messages.
   *
   * @param {object} error: string -> array
   */
  setFormErrors(errors) {
    let formErrors = {};
    Object.keys(errors).forEach((field) => {
      const messages = errors[field].join('\n');
      formErrors[field] = messages;
    });
    this.setState({ errors: formErrors });
  }

  /**
   * Clear the error state at the beginning of each validation (signUp)
   */
  clearFormErrors() {
    this.setState({ errors: {} });
  }

  onFormChange(values) {
    this.setState({ formValues: values });
  }

  /**
   * Attempts to sign the user up using the fields from the form.
   * If successful will progress user to the App, otherwise will
   * render validation errors on each field.
   *
   * @param {function} onSuccess: callback on response when successful
   * @param {function} onFailure: callback on error object when errored
   */

  signUp(event, onSuccess, onFailure) {
    event.preventDefault();
    this.clearFormErrors();
    const value = this.form.getValue();
    if (value) {
      LoginRequester.signUp(
        value,
      ).then((response) => {
        onSuccess && onSuccess(response);
        this.navigateToApp(response);
      }).catch((error) => {
        onFailure && onFailure(error.errors);
        this.setState({ errors: error.errors });
        console.error(error);
      });
    } else {
      onFailure && onFailure();
    }
  }

  /**
   * Routes user to the 'App' screen, which is the MainTabNavigator.
   *
   * @param {object} navProps: data object to be sent to next screen
   */
  navigateToApp(navProps) {
    this.props.navigation.navigate('App', navProps);
  }

  /**
   * Routes user to 'LoginScreen'.
   */
  navigateToLoginScreen(event, onSuccess, onFailure) {
    event.preventDefault();
    this.props.navigation.navigate('Login');
    onSuccess && onSuccess();
  }

  render() {
    return (
      <BackgroundOverlay>
        <RaisedContainer style={styles.raisedContainer}>
          <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollAlign}>
          <Text style={styles.titleStyle}>Sign Up</Text>
            <View style={styles.formContainer}>
              <Form
                refCallback={(ref) => this.form = ref}
                type={this.getFormType()}
                options={this.getFormOptions()}
                value={this.state.formValues}
                onChange={this.onFormChange}
              />
              <Button
                style={margins.marginTop.md}
                onPress={this.signUp}
                text="SUBMIT"
              />
            </View>
          <Button
            style={styles.signupButtonStyle}
            textStyle={styles.signupButtonTextStyle}
            onPress={this.navigateToLoginScreen}
            text="LOGIN"
          />
          </ScrollView>
        </RaisedContainer>
      </BackgroundOverlay>
    );
  }
}


const styles = StyleSheet.create({
  raisedContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    marginTop: 30,
    marginBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollAlign: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 40,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 4,
  },
  titleStyle: {
    color: colors.white,
    backgroundColor: 'transparent',
    fontSize: 36,
    fontWeight: '300',
    zIndex: 100,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonStyle: {
    height: 32,
    borderRadius: 16,
    width: '30%',
  },
  signupButtonTextStyle: {
    fontSize: 13,
  },
});
