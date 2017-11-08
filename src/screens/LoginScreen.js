/**
 * Login screen for veterans.
 */

import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Form, t } from '../components/Form';

import { imageStyles } from '../styles/images';
import { layoutStyles, margins } from '../styles/layout';
import { colors } from '../styles/colors';
import LoginRequester from '../helpers/requesters/LoginRequester';
import BackgroundOverlay from '../components/BackgroundOverlay';
import RaisedContainer from '../components/RaisedContainer';
import Button from '../components/Button';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formValues: this.getInitialFormValues(),
      errors: {},
    }

    this.onFormChange = this.onFormChange.bind(this);
    this.login = this.login.bind(this);
    this.navigateToSignupScreen = this.navigateToSignupScreen.bind(this);
  }

  getInitialFormValues() {
    return {
      email: 'kenchen@berkeley.edu',
      password: 'password',
    };
  }

  getFormType() {
    return t.struct({
      email: t.String,
      password: t.String,
    });
  }

  getFormOptions() {
    return {
      fields: {
        email: {
          value: 'kenchen@berkeley.edu',
          hasError: !!this.state.errors.email,
          error: this.state.errors.email,
        },
        password: {
          secureTextEntry: true,
          password: true,
          value: 'password',
          hasError: !!this.state.errors.password,
          error: this.state.errors.password,
        },
      },
    };
  }

  /**
   * Clear the error state at the beginning of each validation (login)
   */
  clearFormErrors() {
    this.setState({ errors: {} });
  }

  onFormChange(values) {
    this.setState({ formValues: values });
  }

  /**
   * Attempts to login the user to the API. If successful then routes the
   * user to the `App`, otherwise, renders errors.
   *
   * @param {function} onSuccess: callback on response when successful
   * @param {function} onFailure: callback on error object when errored
   */
  login(event, onSuccess, onFailure) {
    event.preventDefault();
    this.clearFormErrors();
    const values = this.form.getValue();
    if (values) {
      LoginRequester.login(
        values.email,
        values.password,
      ).then((response) => {
        console.log(response);
        onSuccess && onSuccess(response);
        this.navigateToApp(response);
      }).catch((error) => {
        console.log(error);
        onFailure && onFailure(error);
        this.setState({ errors: error });
      });
    } else {
      onFailure && onFailure();
    }
  }

  /**
   * Routes the user to the app.
   */
  navigateToApp(navProps) {
    this.props.navigation.navigate('App', navProps);
  }

  /**
   * Routes the user to the `SignupScreen`.
   */
  navigateToSignupScreen(event, onSuccess, onFailure) {
    event.preventDefault();
    this.props.navigation.navigate('Signup', this.state.formValues);
    onSuccess && onSuccess();
  }

  render() {
    return (
      <BackgroundOverlay>
        <RaisedContainer style={styles.raisedContainer}>
          <Text style={styles.titleStyle}>Login</Text>
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
              onPress={this.login}
              text="SUBMIT"
            />
          </View>
          <Button
            style={styles.signupButtonStyle}
            textStyle={styles.signupButtonTextStyle}
            onPress={this.navigateToSignupScreen}
            text="SIGN UP"
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40,
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
