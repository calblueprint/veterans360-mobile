import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Form, t } from '../components/Form';

import { imageStyles } from '../styles/images';
import { layoutStyles, marginTop } from '../styles/layout';
import { colors } from '../styles/colors';
import BackgroundOverlay from '../components/BackgroundOverlay';
import RaisedContainer from '../components/RaisedContainer';
import Button from '../components/Button';

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Connect',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="users" size={20} color="#e91e63" />
    ),
  };

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login(event, onSuccess, onFailure) {
    const value = this.form.getValue();
    if (value) {
      console.log(value);
      onSuccess && onSuccess(value);
    } else {
      console.error("Error occurred.");
      onFailure && onFailure();
    }
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
              style={marginTop.md}
              onPress={this.login}
              text="SUBMIT"
            />
          </View>
        </RaisedContainer>
      </BackgroundOverlay>
    );
  }
}


const styles = StyleSheet.create({
  raisedContainer: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    width: '80%',
    height: '40%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
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
});
