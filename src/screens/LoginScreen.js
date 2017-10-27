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
import BackgroundOverlay from '../components/BackgroundOverlay';
import RaisedContainer from '../components/RaisedContainer';
import Button from '../components/Button';

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Login',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="check" size={20} color="#e91e63" />
    ),
  };

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.redirectToSignupScreen = this.redirectToSignupScreen.bind(this);
  }

  login(event, onSuccess, onFailure) {
    event.preventDefault();
    const value = this.form.getValue();
    if (value) {
      console.log(value);
      onSuccess && onSuccess(value);
    } else {
      console.error("Error occurred.");
      onFailure && onFailure();
    }
  }

  redirectToSignupScreen(event, onSuccess, onFailure) {
    event.preventDefault();
    // TODO: FILL IN
  }

  render() {
    return (
      <BackgroundOverlay>
        <RaisedContainer style={styles.raisedContainer}>
          <Text style={styles.titleStyle}>Login</Text>
          <View style={styles.formContainer}>
            <Form
              style={styles.formStyle}
              refCallback={(ref) => this.form = ref}
              type={t.struct({
                email: t.String,
                password: t.String,
              })}
              options={{
                fields: {
                  password: { secureTextEntry: true },
                },
              }}
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
            onPress={this.redirectToSignupScreen}
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
  formStyle: {
    width: 500,
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
