import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Form, t } from '../components/Form';

import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import BackgroundOverlay from '../components/BackgroundOverlay';
import RaisedContainer from '../components/RaisedContainer';

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

  login() {
    const value = this.form.getValue();
    if (value) {
      console.log(value);
    } else {
      console.error("Error occurred.");
    }
  }

  render() {
    return (
      <BackgroundOverlay>
        <RaisedContainer style={styles.raisedContainer}>
          <Form
            refCallback={(ref) => this.form = ref}
            type={t.struct({
              email: t.String,
              password: t.String,
            })}
          />
        <TouchableHighlight
          onPress={this.login}
        >
          <Text>Save</Text>
        </TouchableHighlight>
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
});
