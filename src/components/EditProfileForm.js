import React from 'react';
import { Form, t } from '../components/Form';
import Button from '../components/Button';
import { View, ScrollView, StyleSheet} from 'react-native';
import RaisedContainer from '../components/RaisedContainer';


class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this._getFormOptions = this._getFormOptions.bind(this);
    // this._clearFormErrors = this._clearFormErrors.bind(this);
    this._onFormChange = this._onFormChange.bind(this);
    this._handleSave = this._handleSave.bind(this);
    this.state = {
      formValues: {
        first_name: this.props.first_name,
        last_name: this.props.last_name,
        email: this.props.email,
        id: this.props.id,
      },
      updating: true,
      errors: [],
    };
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
    this.props.updateSave({veteran: this.state.formValues})
  }

  _renderSaveButton() {
    return (
      <Button
        onPress={this._handleSave}
        text="Save"
        />
    );
  }

  render() {
    return(
      <View>
        <ScrollView>
          <View style={ styles.container }>
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
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 50,
    paddingBottom: 5,
  }
});

export default EditProfileForm;
