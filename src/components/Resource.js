import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';

import BaseRequester from '../helpers/requesters/BaseRequester';
import { colors } from '../styles/colors';
import { APIRoutes } from '../helpers/routes/routes';

export default class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      stillLoading: true,
      categories: [],
    };
  }

  componentDidMount() {
    const resourcesRoute = APIRoutes.resourcePath();
    this.retrieveResources(resourcesRoute).then((resources) => {
      this.setState({ resources: resources, stillLoading: false });
    });
  }

  componentDidUpdate() {
    const resourcesRoute = APIRoutes.resourcePath();
    this.retrieveResources(resourcesRoute).then((resources) => {
        this.setState({ resources: resources });
    });
  }

  async retrieveResources(endpoint) {
    try {
      const urlParams = {
        by_category: JSON.stringify(this.props.categoriesToDisplay),
      };
      let response_json = await BaseRequester.get(endpoint, urlParams);
      let data = response_json.map((item) => {
        let dateRaw = item.updated_at;
        let date = new Date(Date.UTC(dateRaw.substring(0, 4), dateRaw.substring(5, 7), dateRaw.substring(8, 10)));
        return {
          id: item.id,
          title: item.file_name,
          date: date.toLocaleDateString("en-US"),
          link: item.url,
          partner_org: item.owner_id,
          description: item.description,
          category: this.getCategory(item.category),
          upvotes: item.num_upvotes,
          veteran_has_upvoted: item.veteran_has_upvoted,
        };
      }, this);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Retrieves the string name of the category given the category ID.
   * @param {number} categoryId
   */
  getCategory(categoryId) {
    let categoryName = "";
    this.props.categories.forEach((i) => {
      if (i.id === categoryId) {
        categoryName = i.name;
      }
    });
    return categoryName;
  }

  renderResources() {
    return this.state.resources.map((item) => {
      return (
        <View key = { item.id } style={ resourceStyle.contentPanel }>
          <Text style={ resourceStyle.contentTitle }>{ item.title }</Text>
          <View style={ resourceStyle.contentInformation }>
            <View style={{ justifyContent:'center' }}>
              <Text style={ resourceStyle.partnerOrg }>{ item.partner_org }</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft: 5,}}>
              <Text style={ resourceStyle.dateText }>{ item.date }</Text>
            </View>
          </View>
          <Text style={[resourceStyle.bodyText, {marginTop: 10,}]}>{ item.description }</Text>
          <View style={[resourceStyle.contentInformation, { marginTop: 10,}]}>
            <View style={ resourceStyle.button }>
              <Text style={{color:'white', fontSize:12, fontFamily: 'source-sans-pro-semibold',}}>OPEN RESOURCE</Text>
            </View>
            <View style={ resourceStyle.upvote }>
              <TouchableHighlight onPress={() => { this.upvote(item.id, item.veteran_has_upvoted); }}>
                <View style={{ flexDirection: 'row',}}>
                  <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 5,}}>
                    {item.veteran_has_upvoted ? (
                      <Icon name="thumbs-up" size={15} color={ colors.green } />
                    ) : (
                      <Icon name="thumbs-up" size={15} color={ colors.gray } />
                    )}
                  </View>
                  {item.veteran_has_upvoted ? (
                    <Text style={[resourceStyle.upvoteText, { color:colors.green }]}>{ item.upvotes }</Text>
                  ) : (
                    <Text style={[resourceStyle.upvoteText, { color:colors.gray }]}>{ item.upvotes }</Text>
                  )}
                </View>
              </TouchableHighlight>
            </View>
            <View style={ resourceStyle.resourceCategory }>
              <Text style={ resourceStyle.categoryText }>{ item.category }</Text>
            </View>
          </View>
        </View>
      );
    });
  }

  /**
   * Returns the resource element based on the resources provided in the state.
   */
  render() {
    if (this.state.stillLoading == true) {
      return(<Text>Hi</Text>);
    } else {
      return(
        <View>
          {this.renderResources()}
        </View>
      );
    }
  }

  /**
   * Upon call, returns the filter category elements based on the category array in the state.
   */
  async upvote(resourceId, hasUpvoted) {
    const veteranId = this.props.veteranId;
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

        let resourceArr = this.state.resources.slice()
        resourceArr.forEach((i) => {
          if (i.id == resourceId) {
            i.upvotes = i.upvotes - 1;
            i.veteran_has_upvoted = false;
          }
        })
        this.setState({ resources:resourceArr });

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
        let resourceArr = this.state.resources.slice()
        resourceArr.forEach((i) => {
          if (i.id == resourceId) {
            i.upvotes = i.upvotes + 1;
            i.veteran_has_upvoted = true;
          }
        })
        this.setState({ resources:resourceArr });

        return Promise.resolve(response_json);
      } catch(error) {
        console.error(error);
        return Promise.reject(error);
      }
    }
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
    fontSize: 16,
  },
  partnerOrg: {
    fontFamily: 'source-sans-pro-light-italic',
    fontSize: 12,
  },
  dateText: {
    fontFamily: 'source-sans-pro-bold',
    fontSize: 12,
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
    fontSize: 12,
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
    fontSize: 12,
    color: colors.gray,
  },
  bodyText: {
    fontSize: 12,
    fontFamily: 'source-sans-pro-regular',
  },
});
