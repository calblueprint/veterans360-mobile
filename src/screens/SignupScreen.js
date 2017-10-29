/**
 * Signup screen for veterans.
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

    this.state = {
      formValues: this.getInitialFormValues(),
      errors: {},
    };

    this.onFormChange = this.onFormChange.bind(this);
    this.setFormValidationErrors = this.setFormValidationErrors.bind(this);
    this.signUp = this.signUp.bind(this);
    this.navigateToLoginScreen = this.navigateToLoginScreen.bind(this);
    this.confirmMatchingPasswords = this.confirmMatchingPasswords.bind(this);
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
    return t.subtype(t.struct({
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
    }), this.confirmMatchingPasswords);
  }

  getFormOptions() {
    return {
      error: (value) => { return this.setFormValidationErrors(value) },
      fields: {
        email: {
          type: 'email',
          hasError: !!this.state.errors.email,
          message: this.state.errors.email,
        },
        password: {
          password: true,
          secureTextEntry: true
        },
        confirmPassword: {
          password: true,
          secureTextEntry: true
        },
      },
    };
  }

  setFormValidationErrors(formValues) {
    let errors = [];
    // Confirm passwords match
    if (!this.confirmMatchingPasswords(formValues)) {
      errors.push('Passwords must match');
    }
    return errors.join('\n');
  }

  setFormErrors(errors) {
    let formErrors = {};
    Object.keys(errors).forEach((field) => {
      const messages = errors[field].join('\n');
      formErrors[field] = messages;
    });
    this.setState({ errors: formErrors });
  }

  clearFormErrors() {
    this.setState({ errors: {} });
  }

  onFormChange(values) {
    this.setState({ formValues: values });
  }

  confirmMatchingPasswords(value) {
    return value.password === value.confirmPassword;
  }

  signUp(event, onSuccess, onFailure) {
    event.preventDefault();
    const value = this.form.getValue();
    if (value) {
      LoginRequester.signUp(
        value,
        onSuccess,
        onFailure
      ).then((response) => {
        console.log(response);
        if ('errors' in response) {
          // Render errors using flashes
          onFailure && onFailure();
          this.setState({ errors: response.errors });
        } else {
          this.navigateToApp(response);
        }
      }).catch((error) => {
        console.log("An error occurred during sign up.");
      });
    } else {
      onFailure && onFailure();
    }
  }

  navigateToApp(navProps) {
    this.props.navigation.navigate('App', navProps);
  }

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
