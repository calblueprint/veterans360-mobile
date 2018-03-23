import React from 'react';
import { Form, t } from '../components/Form';
import Button from '../components/Button';
import ProfileRequester from '../helpers/requesters/ProfileRequester'
import BaseRequester from '../helpers/requesters/BaseRequester';
import { View, ScrollView, StyleSheet, TouchableOpacity, Icon, Text} from 'react-native';
import { margins } from '../styles/layout';
import { fontStyles } from '../styles/fonts';
import RaisedContainer from '../components/RaisedContainer';


class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this._getFormType = this._getFormType.bind(this);
    this._getFormOptions = this._getFormOptions.bind(this);
    // this._clearFormErrors = this._clearFormErrors.bind(this);
    this._onFormChange = this._onFormChange.bind(this);
    this._handleSave = this._handleSave.bind(this);



    this.state = {
      formValues: this._getInitialFormValues(),
      updating: true,
      errors: [],
    };
  }
  _getInitialFormValues() {
    let values = {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      id: this.props.id,
    }
    console.log(values)
    return values
  }

  _getFormType() {
    return t.struct({
      first_name: t.String,
      last_name: t.String,
      email: t.String,
      activeDuty: t.Boolean,
      veteran: t.Boolean,
      post_911: t.Boolean,
      familyMember: t.Boolean,
      caregiver: t.Boolean,
      other: t.Boolean,
    });
  }

  _getFormOptions() {
    return {
      fields: {
        firstName: {
          hasError: !!this.state.errors.first_name,
          error: this.state.errors.first_name,
          label: 'First Name',
        },
        lastName: {
          hasError: !!this.state.errors.last_name,
          error: this.state.errors.last_name,
          label: 'Last Name',
        },
        email: {
          label: 'Email',
          hasError: !!this.state.errors.email,
          error: this.state.errors.email,
        },
      },
    };
  }

  _onFormChange(values) {
    this.setState({ formValues: values });
  }

  _handleSave() {
    console.log('handleSave');
    console.log(this.state.formValues);
    this.props.updateSave({veteran: this.state.formValues})
  }

  _renderSaveButton() {
    return (
      <Button
        onPress = {this._handleSave}
        text="Save"
        />
    );
  }

  render() {
    console.log('render');
    console.log(this.props);
    console.log('state');
    console.log(this.state);
    console.log('hi');
    console.log(this.props.id);
    return(
      <View>
        <ScrollView>
          <View>
            <Form
              refCallback={(ref) => this.form = ref}
              type={this._getFormType()}
              options={this._getFormOptions()}
              value={this.state.formValues}
              onChange={this._onFormChange}
            />
            </View>
          </ScrollView>
          {this._renderSaveButton()}
        </View>
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
  }
});

export default EditProfileForm;