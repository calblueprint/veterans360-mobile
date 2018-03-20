
import React from 'react';
import { APIRoutes } from '../helpers/routes/routes';
import BaseRequester from '../helpers/requesters/BaseRequester';
import {
  TextInput,
  Button,
  ScrollView,
} from 'react-native';

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
    updatedUser: this.props.current_veteran,
  };
}


  _handleUpdate(params) {
    const successFunc = (responseData) => {
      this.props.navigation.navigate('ProfileScreen');
    }
    updatedUser = this.state;
    ProfileRequester.updateUser(updatedUser).then(success).catch(failure);
  }

  render() {
    // const updated = this.state.updatedUser;
    <View>
      <EditProfileForm
        first_name={this.state.updatedUser.first_name}
        last_name={this.state.updatedUser.last_name}
        email={this.state.updatedUser.email}
        updateSave={this._handleUpdate().bind(this)}  />
    </View>

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
