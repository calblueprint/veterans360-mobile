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
import BackgroundOverlay from '../components/BackgroundOverlay';
import RaisedContainer from '../components/RaisedContainer';
import Button from '../components/Button';

export default class SignupScreen extends React.Component {

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.navigateToLoginScreen = this.navigateToLoginScreen.bind(this);
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
                type={t.struct({
                  first_name: t.String,
                  last_name: t.String,
                  email: t.String,
                  password: t.String,
                  confirmPassword: t.String,
                  activeDuty: t.Boolean,
                  veteran: t.Boolean,
                  post_911: t.Boolean,
                  family_member: t.Boolean,
                  caregiver: t.Boolean,
                  other: t.Boolean,
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
