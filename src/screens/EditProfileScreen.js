//passing in props==params-> this.props.navigation.state.params
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
    console.log('update');
    console.log(params);
    const successFunc = (responseData) => {
      this.props.navigation.navigate('Profile');
    }
    ProfileRequester.updateUser(params).then((response) => {
      this.props.navigation.navigate('Profile')
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
    const veteran_id= this.props.navigation.state.params.id;
    return(
      <View>
        <EditProfileForm
          first_name={this.props.navigation.state.params.first_name.first_name}
          last_name={this.props.navigation.state.params.last_name}
          email={this.props.navigation.state.params.email}
          id={veteran_id}
          role= {this.props.navigation.state.params.role}
          updateSave={this._handleUpdate.bind(this)}  />
      </View>
    )
  }
}

export default EditProfileScreen;
