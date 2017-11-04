import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';

export default class ConnectScreen extends React.Component {

  navigateToSignUp() {
    console.log("connect screen");
    console.log(this.props.navigation.state);
    this.props.navigation.navigate('ConnectSignUp', this.props.navigation.state.params);
  }

  navigateToSignUp() {
    this.props.navigation.navigate('ConnectSignUp');
  }

  render() {
    return (
      <View style={layoutStyles.flexCenter}>
        <Text>This is the Connect screen!</Text>
        <TouchableHighlight onPress={ () => { this.navigateToSignUp(); } }>
          <Text>Navigate to connect sign up</Text>
        </TouchableHighlight>
      </View>
    );
  }
<<<<<<< HEAD
}

=======
}
>>>>>>> sign up for connect
