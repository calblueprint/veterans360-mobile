/**
 * Signup screen for veterans.

 * Basically a container for a sign up form with helpers to
 * send data back to the API, receive validations, and then render
 * any errors. See Form documentation for usage of form and data types.
 *
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { Form, t } from '../components/Form';

import { imageStyles } from '../styles/images';
import { layoutStyles, margins } from '../styles/layout';
import { colors } from '../styles/colors';
import LoginRequester from '../helpers/requesters/LoginRequester';
import BackgroundOverlay from '../components/BackgroundOverlay';
import RaisedContainer from '../components/RaisedContainer';
import Button from '../components/Button';

export default class SignupScreen extends React.Component {

  constructor(props) {
    super(props);

<<<<<<< b817c0d3dcb641f9babce39374ab9a05c03e8fa7
<<<<<<< d8d82701c0414edb73fc76c27248f4f23820a031
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
=======
    this.login = this.login.bind(this);
=======
    this.signUp = this.signUp.bind(this);
>>>>>>> Finishes sign up feature, may need some extra backend validations and flashes for rendering errors.
    this.navigateToLoginScreen = this.navigateToLoginScreen.bind(this);
>>>>>>> Begins hooking up login to API.
  }

<<<<<<< b817c0d3dcb641f9babce39374ab9a05c03e8fa7
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
=======
  getInitialFormValues() {
    return {
      firstName: 'Ken',
      lastName: 'Chen',
      email: 'lbkchen@gmail.com',
      password: 'password',
      confirmPassword: 'password'
    }
  }

>>>>>>> Finishes sign up feature, may need some extra backend validations and flashes for rendering errors.
  signUp(event, onSuccess, onFailure) {
    event.preventDefault();
    this.clearFormErrors();
    const value = this.form.getValue();
    if (value) {
      LoginRequester.signUp(
        value,
<<<<<<< b817c0d3dcb641f9babce39374ab9a05c03e8fa7
      ).then((response) => {
        console.log(response);
        onSuccess && onSuccess(response);
        this.navigateToApp(response);
      }).catch((error) => {
        console.log(error);
        onFailure && onFailure(error);
        this.setState({ errors: error })
      });
    } else {
      onFailure && onFailure();
    }
  }

<<<<<<< d8d82701c0414edb73fc76c27248f4f23820a031
  /**
   * Routes user to the 'App' screen, which is the MainTabNavigator.
   *
   * @param {object} navProps: data object to be sent to next screen
   */
=======
        onSuccess,
        onFailure
      ).then((response) => {
        console.log(response);
        this.navigateToApp(response);
      }).catch((error) => {
        console.log("An error occurred during sign up.")
      });
    }
  }

>>>>>>> Finishes sign up feature, may need some extra backend validations and flashes for rendering errors.
  navigateToApp(navProps) {
    this.props.navigation.navigate('App', navProps);
  }

<<<<<<< b817c0d3dcb641f9babce39374ab9a05c03e8fa7
  /**
   * Routes user to 'LoginScreen'.
   */
=======
>>>>>>> Begins hooking up login to API.
=======
>>>>>>> Finishes sign up feature, may need some extra backend validations and flashes for rendering errors.
  navigateToLoginScreen(event, onSuccess, onFailure) {
    event.preventDefault();
    this.props.navigation.navigate('Login');
    onSuccess && onSuccess();
  }

  render() {
    return (
      <BackgroundOverlay>
        <RaisedContainer style={styles.raisedContainer}>
          <Text style={styles.titleStyle}>Sign Up</Text>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.formContainer}>
              <Form
                refCallback={(ref) => this.form = ref}
<<<<<<< d8d82701c0414edb73fc76c27248f4f23820a031
                type={this.getFormType()}
                options={this.getFormOptions()}
                value={this.state.formValues}
                onChange={this.onFormChange}
=======
                type={t.struct({
                  firstName: t.String,
                  lastName: t.String,
                  email: t.String,
                  password: t.String,
                  confirmPassword: t.String,
                  activeDuty: t.Boolean,
                  veteran: t.Boolean,
                  post_911: t.Boolean,
                  familyMember: t.Boolean,
                  caregiver: t.Boolean,
                  other: t.Boolean,
                })}
                options={{
                  fields: {
                    password: { secureTextEntry: true },
                    confirmPassword: { secureTextEntry: true },
                  },
                }}
<<<<<<< b817c0d3dcb641f9babce39374ab9a05c03e8fa7
>>>>>>> Begins hooking up login to API.
=======
                value={this.getInitialFormValues()}
>>>>>>> Finishes sign up feature, may need some extra backend validations and flashes for rendering errors.
              />
              <Button
                style={margins.marginTop.md}
                onPress={this.signUp}
                text="SUBMIT"
              />
            </View>
          </ScrollView>
          <Button
            style={styles.signupButtonStyle}
            textStyle={styles.signupButtonTextStyle}
            onPress={this.navigateToLoginScreen}
            text="LOGIN"
          />
        </RaisedContainer>
      </BackgroundOverlay>
    );
  }
}


const styles = StyleSheet.create({
  raisedContainer: {
    position: 'absolute',
    left: '10%',
    width: '80%',
    height: '60%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  formContainer: {
    marginBottom: 80,
  },
  titleStyle: {
    position: 'absolute',
    top: -72,
    color: colors.white,
    backgroundColor: 'transparent',
    fontSize: 36,
    fontWeight: '300',
    zIndex: 100,
  },
  signupButtonStyle: {
    position: 'absolute',
    bottom: -72,
    height: 32,
    borderRadius: 16,
  },
  signupButtonTextStyle: {
    fontSize: 13,
  },
});
