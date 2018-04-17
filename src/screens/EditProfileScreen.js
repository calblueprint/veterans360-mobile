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
    this._fetchVeteran(veteran_id);
    console.log('fetch');
    console.log(this.props.navigation.state.params.first_name);
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

//
//
//
// class EditProfileScreen extends React.Component {
//
//     constructor(props){
//       super(props);
//
//       this.state = {
//         id: this.props.user.id,
//         first_name: this.props.user.first_name,
//         last_name: this.props.user.last_name,
//         email: this.props.user.email,
//         isUpdating: false,
//         mounted: false,
//       };
//     }
//
//     componentDidMount() {
//       this.props.navigation.setParams({
//         updateProfile: this.updatingProfile,
//         isUpdating: false,
//       });
//     }
//
//     saveOption() {
//       params = this.props.user;
//       return (
//         <Button>
//         title='Save'
//         onPress={params.updateProfile}
//         isLoading={params.isUpdating}
//         <Button/>
//       );
//     }
//
//     updatingProfile() {
//       success = (user) => {
//         this._updateState(user); //update state
//         this.setState({
//           isUpdating: false,
//         });
//         this.props.navigation.goBack();
//       }
//       failure = (error) => {
//         this.setState({
//           isUpdating: false,
//         });
//       }
//
//     // this.setState({
//     //   isUpdating: true,
//     // });
//
//       updatedUser = this.state;
//       ProfileRequester.updateUser(updatedUser).then(success).catch(failure);
//     }
//
//
//     _updateState = (user) => {
//        this.setState({
//           user: user,
//         });
//
//       }
//
//     render() {
//       return (
//         <ScrollView>
//           <TextInput>
//               defaultValue = {this.state.first_name}
//               placeholder = {'First Name'}
//               onChangeText={(text) => this.setState({first_name: text})}
//               editable = {!this.state.isUpdating}
//           </TextInput>
//           <TextInput>
//             defaultValue = {this.state.last_name}
//             placeholder = {'Last Name'}
//             onChangeText={(text) => this.setState({first_name: text})}
//             editable = {!this.state.isUpdating}
//           </TextInput>
//         <ScrollView>
//
//       );
//     }
// }
//
export default EditProfileScreen;
