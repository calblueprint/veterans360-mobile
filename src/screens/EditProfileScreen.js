import EditProfileForm from '../components/EditProfileForm';
import React from 'react';
import { APIRoutes } from '../helpers/routes/routes';
import ProfileRequester from '../helpers/requesters/ProfileRequester'
import BaseRequester from '../helpers/requesters/BaseRequester';
import ProfileScreenNavigator from '../navigators/ProfileScreenNavigator';

import {
  TextInput,
  Button,
  View,
  Text,
  ScrollView,
} from 'react-native';

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValues : { },
    };
  }

  componentDidMount() {
    this._fetchVeteran(this.props.navigation.state.params.id);
  }

  _fetchVeteran(id, onSuccess, onFailure) {
    ProfileRequester.getCurrentUser(id).then((response) => {
      this.setState({defaultValues: response});
      onSuccess && onSuccess(response);
    }).catch((error) => {
      onFailure && onFailure(error.error);
      this.setState({ errors: error.error });
      console.error(error);;
    });
  }

/**
 *
 * @param {function} onSuccess: callback on response when successful
 * @param {function} onFailure: callback on error object when errored
 */

  _handleUpdate(params, onSuccess, onFailure) {
    ProfileRequester.updateUser(params).then((response) => {
      this.props.navigation.navigate('Profile', params.veteran)
      onSuccess && onSuccess(response);
    }).catch((error) => {
      onFailure && onFailure(error.error);
      this.setState({ errors: error.error });
      console.error(error);;
    });
  }

  _getParams() {
    return this.props.navigation.state.params;
  }

  render() {
    const params = this._getParams(); //replace with params
    return(
      <View>
        <EditProfileForm
          first_name={params.first_name}
          last_name={params.last_name}
          email={params.email}
          id={params.id}
          role= {params.role}
          updateSave={this._handleUpdate.bind(this)}
        />
      </View>
    )
  }
}

export default EditProfileScreen;
