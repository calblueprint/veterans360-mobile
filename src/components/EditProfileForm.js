import React from 'react';
import { Form, t } from '../components/Form';



class EditProfileForm {
  constructor(props) {
    super(props);

    this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this._getFormType = this._getFormType.bind(this);
    this._getFormOptions = this._getFormOptions.bind(this);
    // this._clearFormErrors = this._clearFormErrors.bind(this);
    this._onFormChange = this._onFormChange.bind(this);

    this.state = {
      formValues: this.getInitialFormValues(),
      updating: true,
    };
  }

  getInitialFormValues() {
    return (
      first_name: this.props.first_name,
      last_name: this.props..last_name,
      email: this.props.email,
    );
  }

  getFormType() {
    return t.struct({
      firstName: t.String,
      lastName: t.String,
      email: t.String,
    });
  }

  getFormOptions() {
    return {
      fields: {
        firstName: {
          hasError: !!this.state.errors.first_name,
          error: this.state.errors.first_name,
        },
        lastName: {
          hasError: !!this.state.errors.last_name,
          error: this.state.errors.last_name,
        },
        email: {
          type: 'email',
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
    this.props.updateSave({current_veteran: this.state.formValues})
  }

  _renderSaveButton() {
    return (
      <Button
        onPress = {this._handleSave()}
        text='Save',
        />
    );
  }

  render() {
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

export default EditProfileForm;
