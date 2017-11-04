import React, { Component } from 'react';
import { Font } from 'expo';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import Icon from '@expo/vector-icons/FontAwesome';
import { AppRegistry, Text, StyleSheet, TextInput, View, ScrollView, TouchableHighlight } from 'react-native';
import { Form, t } from '../components/Form';

export default class ConnectSignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: this.getInitialFormValues(),
      errors: {},

    };

    this.onFormChange = this.onFormChange.bind(this);

  }

  getInitialFormValues() {
    console.log("in here");
    return {
      militaryStatus: 0,
      militaryBranch: 0,
      unit: "hehe",
      notes: "heehee",
      acceptMessages: true,
      shareProfile: true,
      acceptNotices: true,
    };
  }

  getFormType() {
    return t.struct({
      militaryStatus: t.enums({
        0: 'Select Military Status',
        1: 'Active Duty',
        2: 'Veteran',
        3: 'Combat Veteran',
        4: 'Post 9/11',
        5: 'Family Member',
        6: 'Caregiver',
      }),
      militaryBranch: t.enums({
        0: 'Select Military Status',
        1: 'Army',
        2: 'Navy',
        3: 'Marines',
        4: 'Air Force',
        5: 'Coast Guard',
        6: 'First Responder',
      }),
      unit: t.String,
      notes: t.String,
      acceptMessages: t.Boolean,
      shareProfile: t.Boolean,
      acceptNotices: t.Boolean,
    });
  }

  getFormOptions() {
    return {
      fields: {
        unit: {
          value: 'hello',
          hasError: !!this.state.errors.unit,
          error: this.state.errors.unit,
        },
      },
    };
  }

  onFormChange(values) {
    this.setState({ formValues: values });
  }

  render() {
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
                    //refCallback={(ref) => this.form = ref}
                    type={this.getFormType()}
                    options={this.getFormOptions()}
                    value={this.getInitialFormValues()}
                    onChange={this.onFormChange}
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