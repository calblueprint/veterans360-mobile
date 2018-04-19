
import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
 
// import Pdf from 'react-native-pdf';
 
export default class PdfScreen extends React.Component {
    render() {
        const source = {
            // uri: this.props.file_link,
            uri: this.props.navigation.state.params.file_link,
            cache:  true,
        };
 
        return (
            <View style={styles.container}>
            </View>
        )
  }
}


 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
});