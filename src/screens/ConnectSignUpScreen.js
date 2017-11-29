import React, { Component } from 'react';
import { Font } from 'expo';
import { imageStyles } from '../styles/images';
import { layoutStyles, margins } from '../styles/layout';
import Icon from '@expo/vector-icons/FontAwesome';
import { AppRegistry, Text, StyleSheet, TextInput, View, ScrollView, TouchableHighlight } from 'react-native';
import { Form, t } from '../components/Form';
import Button from '../components/Button';
import ConnectSignUpRequester from '../helpers/requesters/ConnectSignUpRequester';
import BaseRequester from '../helpers/requesters/BaseRequester';
import { APIRoutes } from '../helpers/routes/routes';

export default class ConnectSignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: this.getInitialFormValues(),
      errors: {},
      stillLoading: true,
      militaryBranches : null
    };

    this.onFormChange = this.onFormChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.navigateToConnect = this.navigateToConnect.bind(this);
  }

  async componentDidMount() {
    try {
      const endpoint = APIRoutes.veteransMilitaryBranch();
      let response_json = await BaseRequester.get(endpoint);
      let militaryBranchDict = {};
      for (var key in response_json) {
        if (response_json.hasOwnProperty(key)) {
          militaryBranchDict[response_json[key]] = this.formatDict(key);
        }
      }
      this.setState({ stillLoading: false, militaryBranches: militaryBranchDict });
      return Promise.resolve(response_json);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  formatDict(str) {
    newStr = "";
    for (var i = 0; i < str.length; i++) {
      if (str[i] == '_') {
        newStr += " ";
      } else {
        newStr += str[i];
      }
    }
    return newStr;
  }

  /**
    * Returns params for default values of the form
    */
  getInitialFormValues() {
    return {
      acceptMessages: true,
      shareProfile: true,
      acceptNotices: true,
    };
  }

  /**
    * Defines the field types of the form
    */
  getFormType() {
    return t.struct({
      militaryBranch: t.enums(this.state.militaryBranches),
      unit: t.String,
      notes: t.String,
      acceptMessages: t.Boolean,
      shareProfile: t.Boolean,
      acceptNotices: t.Boolean,
    });
  }

  onFormChange(values) {
    this.setState({ formValues: values });
  }

  /**
    * Routes the user to the Connect screen.
    */
  navigateToConnect(navProps) {
    this.props.navigation.navigate('Connect', navProps);
  }

  /**
   * Attempts to sign the user up for Connect. If successful then routes the
   * user to `Connect`, otherwise, renders errors.
   *
   * @param {function} onSuccess: callback on response when successful
   * @param {function} onFailure: callback on error object when errored
   */
  signUp(event, onSuccess, onFailure) {
    event.preventDefault();
    const values = this.state.formValues;
    values.militaryBranch = parseInt(values.militaryBranch);
    if (values) {
      ConnectSignUpRequester.signUp(
        this.props.navigation.state.params.id,
        values,
      ).then((response) => {
        onSuccess && onSuccess(response);
        this.navigateToConnect(response);
      }).catch((error) => {
        onFailure && onFailure(error);
        this.setState({ errors: error });
      });
    } else {
      onFailure && onFailure();
    }
  }

  render() {
    if(this.state.stillLoading) {
      return (
        <View/>
      );
    } else {
    	return (
    		<View style={ styles.backgroundContainer }>
          <View style={{flex: 1,}}>
            <View style={ styles.backgroundDisplay }>
            </View>
            <View style={ styles.contentContainer }>
              <Text style={ styles.titleText }>Sign Up for Connect</Text>
              <View style={ styles.formContainer }>
                <View style={ styles.formWrapper }>
                  <ScrollView>
                    <Form
                      refCallback={(ref) => this.form = ref}
                      type={this.getFormType()}
                      value={this.state.formValues}
                      onChange={this.onFormChange}
                    />
                     <Button
                      style={margins.marginTop.md}
                      onPress={this.signUp}
                      text="SIGN UP"
                    />
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>
    	)
    }
  }
}


const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor:'#F2F2F2',
  },
  backgroundDisplay: {
    height: 400,
    width: 1000,
    transform: [{rotate: '-8deg'}],
    backgroundColor: '#27AE60',
    zIndex: -1,
    left: -200,
    top: -200,
  },
  contentContainer: {
    position: 'absolute',
    top: 50,
    bottom: 50,
    right: 25,
    left: 25,
  },
  titleText: {
    fontFamily: 'source-sans-pro-light',
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'white',
  },
  formContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  }
});
