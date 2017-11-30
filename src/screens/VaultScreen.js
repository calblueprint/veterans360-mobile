import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, TextInput, View, ScrollView, TouchableHighlight } from 'react-native';
import { Font } from 'expo';
import Icon from '@expo/vector-icons/FontAwesome';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import { colors } from '../styles/colors';
import { APIRoutes } from '../helpers/routes/routes';
import BaseRequester from '../helpers/requesters/BaseRequester';

export default class VaultScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Vault',
    tabBarIcon: ({ tintColor }) => (
<<<<<<< HEAD
      <Icon name="briefcase" size={22} color={ tintColor } />
=======
      <Icon name="briefcase" size={22} color="#e91e63" />
>>>>>>> origin/master
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      filter: [],
      categories: [
        {name: 'CLEAR', selected:false, id: 1},
        {name: 'FINANCE', selected:true, id: 2},
        {name: 'HOUSING', selected:true, id: 3},
        {name: 'EMPLOYMENT', selected:true, id: 4},
        {name: 'LEGAL', selected:true, id: 5},
        {name: 'MENTAL HEALTH', selected:true, id: 6},
      ],

      resources: [
        /*
        {title: 'Title of Resource',
          partner_org: 'Name of Partner Org',
          date:'8 Oct 2018',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et aliquam neque. Proin lectus neque, tincidunt eget elementum sit amet, rhoncus ut libero.',
          link: 'something',
          upvotes: 0,
          category: 2,
          id: 1,
          veteran_has_upvoted: boolean
        },
        */
      ],
      stillLoading: true,
    };
    this.falseState = this.falseState.bind(this);
    this.setOpposite = this.setOpposite.bind(this);
    this.renderResourceContent = this.renderResourceContent.bind(this);
  }

  componentDidMount() {
    this.retrieveResources();
  }

  async retrieveResources() {
    try {
      const endpoint = APIRoutes.resourcePath();
      let response_json = await BaseRequester.get(endpoint);
      data = response_json.map(function(item) {
        return {
          id: item.id,
          title: item.file_name,
          date: this.formatDate(item.updated_at),
          link: item.url,
          partner_org: item.owner_id,
          description: item.description,
          category: this.getCategory(parseInt(item.category)),
          upvotes: item.num_upvotes,
          veteran_has_upvoted: item.veteran_has_upvoted,
        };
      }, this);
      this.setState({ resources: data, stillLoading: false });
      this.setState({ stillLoading: false });
      return Promise.resolve(response_json);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  formatDate(date) {
    return date.substring(5, 7) + "/" + date.substring(8, 10) + "/" + date.substring(0, 4)
  }

  /**
   * Updates the category filter and set state to updated categories
   * @param {Number} itemId 
   * @param {Boolean} newState
   */
  updateFilter(itemId, newState) {
    var categoriesArr = this.state.categories.slice()
    categoriesArr.forEach((i) => {
      if (i.id == itemId) {
        i.selected = newState;
      }
    })
    this.setState({ categories:categoriesArr });
  }

  /**
   * Sets the category with the provided ID to have the opposite filter selection
   * @param {Number} itemId 
   */
  setOpposite(itemId) {
    this.state.categories.forEach((i) => {
      if (i.id == itemId) {
        this.updateFilter(itemId, !i.selected);
      }
    })
  }

  /**
   * Sets the state of the selected filter to be the opposite. If the 'clear' button was selected, all categories are set to false.
   * @param {String} name
   * @param {Number} itemId 
   */
  falseState(name, itemId) {
    if(name==='CLEAR') {
      for(var i = 1; i < this.state.categories.length; i++) {
        this.updateFilter(this.state.categories[i].id, false)
      }
    } else {
      this.setOpposite(itemId);
    }
  }

  /**
   * Upon call, returns the category elements based on the categories in the state
   */
  filterScroller() {
    return this.state.categories.map((item) => {
      if (item.selected==false) {
        return (
          <TouchableHighlight key = { item.id } style={ styles.item } onPress={ () => { this.falseState(item.name, item.id); } }>
            <Text style={ { color:'white', fontSize:12, fontFamily: 'source-sans-pro-semibold', } }>{item.name}</Text>
          </TouchableHighlight>
        );
      } else {
        return (
          <TouchableHighlight key = { item.id } style = {[styles.item, { backgroundColor:'white', }]} onPress={() => {this.setOpposite(item.id);}}>
            <Text style={{ color:'black', fontSize:12, fontFamily: 'source-sans-pro-semibold',}}>{item.name}</Text>
          </TouchableHighlight>
        );
      }
    })
  }

  /**
   * Upon call, returns the filter category elements based on the category array in the state.
   */
  async upvote(resourceId, hasUpvoted) {
    const veteranId = this.props.navigation.state.params.id;
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
        this.retrieveResources();
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
        this.retrieveResources();
        return Promise.resolve(response_json);
      } catch(error) {
        console.log(error);
        return Promise.reject(error);
      }
    }
  }

  /**
   * Retrieves the string name of the category given the category ID.
   * @param {number} categoryId
   */
  getCategory(categoryId) {
    for(var i = 0; i < this.state.categories.length; i++) {
      if(this.state.categories[i].id==categoryId) {
        return this.state.categories[i].name;
      }
    }
  }

  /**
   * Returns the resource element based on the resources provided in the state.
   */
  displayResources() {
    return this.state.resources.map((item) => {
      return (
        <View key = { item.id } style={ styles.contentPanel }>
          <Text style={ styles.contentTitle }>{ item.title }</Text>
          <View style={ styles.contentInformation }>
            <View style={{ justifyContent:'center' }}>
              <Text style={ styles.partnerOrg }>{ item.partner_org }</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft: 5,}}>
              <Text style={ styles.dateText }>{ item.date }</Text>
            </View>
          </View>
          <Text style={[styles.bodyText, {marginTop: 10,}]}>{ item.description }</Text>
          <View style={[styles.contentInformation, { marginTop: 10,}]}>
            <View style={ styles.button }>
              <Text style={{color:'white', fontSize:12, fontFamily: 'source-sans-pro-semibold',}}>OPEN RESOURCE</Text>
            </View>
            <View style={ styles.upvote }>
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
                    <Text style={[styles.upvoteText, { color:colors.green }]}>{ item.upvotes }</Text>
                  ) : (
                    <Text style={[styles.upvoteText, { color:colors.gray }]}>{ item.upvotes }</Text>
                  )}
                </View>
              </TouchableHighlight>
            </View>
            <View style={ styles.resourceCategory }>
              <Text style={ styles.categoryText }>{ item.category }</Text>
            </View>
          </View>
        </View>
      );
    })
  }

  onSubmitEdit = () => {
    //add options
  }

  renderResourceContent() {
    return (
      <View style={ styles.backgroundContainer }>
        <View style={{flex: 1,}}>
          <View style={ styles.backgroundDisplay }>
          </View>
          <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,}}>
            <ScrollView>
              <View style={[styles.contentContainer, {top:0,}]}>
                <Text style={[styles.baseText, {marginBottom: 5,}]}>
                  <Text style={[styles.titleText, {color:'rgb(255, 255, 255)'}]}>
                    Resources
                  </Text>
                </Text>
                <View style={[styles.search, {marginTop: 5,}]}>
                  <TextInput style={styles.searchBar} placeholderTextColor="rgba(255, 255, 255, 0.5)" placeholder="Search resources" onChangeText={(searchText) => this.setState({searchText})}/>
                </View>
              </View>
              <ScrollView horizontal={ true } showsHorizontalScrollIndicator={ false } style={styles.filter}>  
                {this.filterScroller()}
              </ScrollView>
              <View style={styles.contentContainer}>
                {this.displayResources()}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1,}}>
        {this.renderResourceContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'source-sans-pro-regular',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'source-sans-pro-semibold',
  },
  bodyText: {
    fontSize: 12,
<<<<<<< HEAD
    fontFamily: 'source-sans-pro-regular',
=======
    fontFamily: 'source-sans-pro-black',
>>>>>>> origin/master
  },
  contentContainer: {
    flexDirection:'column',
    marginTop: 50,
    marginLeft:15,
    marginRight:15,
    backgroundColor:'rgba(255, 255, 255, 0)',
  },
  backgroundContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.light_snow,
  },
  backgroundDisplay: {
    height: 400,
    width: 1000,
    transform: [{rotate: '-8deg'}],
    backgroundColor: colors.light_steel,
    zIndex: -1,
    left: -200,
    top: -200,
  },
  search: {
    flexDirection:'row',
    flex:1,
  },
  searchBar: {
    height: 30,
    borderRadius: 20,
    borderWidth:0.8,
    fontSize: 12,
    borderColor: 'rgb(255, 255, 255)',
    color: 'rgb(255, 255, 255)',
    paddingLeft: 13,
    paddingRight:13,
    flex: 0.92,
    fontFamily:'source-sans-pro-light',
  },
  item: {
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 4,
    borderWidth: 1,
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor: 'rgb(255, 255, 255)'
  },
  filter: {
    position: 'absolute',
    marginLeft:13,
    marginTop: 125,
  },
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
  partnerOrgIcon: {
    backgroundColor: 'black',
    height: 30,
    borderRadius: 15,
    width: 30,
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
});
