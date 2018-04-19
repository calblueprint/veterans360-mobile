import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Button,
  Linking,
  ScrollView
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';

import BaseRequester from '../helpers/requesters/BaseRequester';
import { colors } from '../styles/colors';
import { APIRoutes } from '../helpers/routes/routes';

export default class ResourceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: this.props.resource_upvotes,
      has_upvoted: this.props.resource_veteran_has_upvoted
    }
  }

  async upvote(resourceId, hasUpvoted) {
    const veteranId = this.props.veteran_id;
    if (hasUpvoted) {
      try {
        const endpoint = APIRoutes.deleteUpvote();
        const params = {
          upvote: {
            resource_id: resourceId,
            veteran_id: veteranId
          }
        };
        let response_json = await BaseRequester.patch(endpoint, params);
        this.setState({
          upvotes: this.state.upvotes - 1,
          has_upvoted: !this.state.has_upvoted
        });
        return Promise.resolve(response_json);
      } catch(error) {
        return Promise.reject(error);
      }
    } else {
      try {
        const endpoint = APIRoutes.newUpvote();
        const params = {
          upvote: {
            veteran_id: veteranId,
            resource_id: resourceId
          }
        };
        let response_json = await BaseRequester.post(endpoint, params);
        this.setState({
          upvotes: this.state.upvotes + 1,
          has_upvoted: !this.state.has_upvoted
        });
        return Promise.resolve(response_json);
      } catch(error) {
        console.error(error);
        return Promise.reject(error);
      }
    }
  }

  renderResource() {
    return (
      <View key = { this.props.resource_id } style={ resourceStyle.contentPanel }>
        <Text style={ resourceStyle.contentTitle }>{ this.props.resource_partneringOrg_name }</Text>
        <Text style={[resourceStyle.bodyText, {marginTop: 10,}]}>{ this.props.resource_partneringOrg_description }</Text>
        <View style={[resourceStyle.contentInformation, { marginTop: 10,}]}>
          <View style={ resourceStyle.button }>
            <Button color="white" title="VIEW PDF"
            onPress={ ()=>{ Linking.openURL(this.props.resource_file_link)}} />
          </View>
          <View style={ resourceStyle.upvote }>
            <TouchableHighlight onPress={() => { this.upvote(this.props.resource_id, this.state.has_upvoted); }}>
              <View style={{ flexDirection: 'row',}}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 5,}}>
                  {this.state.has_upvoted ? (
                    <Icon name="thumbs-up" size={18} color={ colors.green } />
                  ) : (
                    <Icon name="thumbs-up" size={18} color={ colors.gray } />
                  )}
                </View>
                {this.state.has_upvoted ? (
                  <Text style={[resourceStyle.upvoteText, { color:colors.green }]}>{ this.state.upvotes }</Text>
                ) : (
                  <Text style={[resourceStyle.upvoteText, { color:colors.gray }]}>{ this.state.upvotes }</Text>
                )}
              </View>
            </TouchableHighlight>
          </View>
          <View style={ resourceStyle.resourceCategory }>
            <Text style={ resourceStyle.categoryText }>{ this.props.resource_category }</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return(
      <ScrollView>
        {this.renderResource()}
      </ScrollView>
    );
  }
}

const resourceStyle = StyleSheet.create({
  contentPanel: {
    backgroundColor: 'white',
    borderLeftWidth: 10,
    borderLeftColor: colors.green,
    paddingLeft:10,
    paddingRight: 10,
    paddingTop:15,
    paddingBottom: 15,
    shadowColor:'black',
    shadowOpacity:0.05,
    shadowOffset:{width:5, height:10},
    marginBottom: 10,
  },
  contentInformation: {
    flexDirection:'row',
  },
  contentTitle: {
    fontFamily: 'source-sans-pro-bold',
    fontSize: 18,
  },
  partnerOrg: {
    fontFamily: 'source-sans-pro-light-italic',
    fontSize: 14,
  },
  dateText: {
    fontFamily: 'source-sans-pro-bold',
    fontSize: 14,
    color: colors.gray,
  },
  button: {
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 20,
    backgroundColor: colors.green,
  },
  upvote: {
    justifyContent:'center',
    marginLeft: 10,
  },
  upvoteText: {
    fontFamily: 'source-sans-pro-bold',
    fontSize: 16,
  },
  upvote: {
    justifyContent:'center',
    marginLeft: 10,
  },
  resourceCategory: {
    justifyContent:'center',
    marginLeft: 10,
  },
  categoryText: {
    fontFamily: 'source-sans-pro-light-italic',
    fontSize: 14,
    color: colors.gray,
  },
  bodyText: {
    fontSize: 16,
    fontFamily: 'source-sans-pro-regular',
  },
});
