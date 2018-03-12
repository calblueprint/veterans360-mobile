import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
  Picker,
} from 'react-native';

import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import { colors } from '../styles/colors';
import { APIRoutes } from '../helpers/routes/routes';
import BaseRequester from '../helpers/requesters/BaseRequester';
import Resource from '../components/Resource';
import CategoryRequester from '../helpers/requesters/CategoryRequester';

export default class VaultScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      categories: [],
      selected_category: 1, // Default category is Financial
      resources: [],
      stillLoading: true,
    };
    this.renderResourceContent = this.renderResourceContent.bind(this);
    this.getPickerOptions = this.getPickerOptions.bind(this);

  }

  componentDidMount() {
    CategoryRequester.retrieveCategories().then((response) => {
      let categories = this.state.categories.slice();
      categories = categories.concat(response);
      this.setState({ categories: categories, stillLoading: false });
    })
  }

  /**
   * Upon call, returns the category elements based on the categories in the state
   */
  getPickerOptions() {
    return this.state.categories.map((category, i) => {
        return (
          <Picker.Item key={i} label={category.name} value={category.id} />
        );
    })
  }

  updateSelected = (itemValue, itemIndex) => {
    console.log("updating selected")
    this.setState({selected_category: itemIndex+1});
    console.log("updated selected");
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
              <Picker
                selectedValue={this.state.selected_category}
                onValueChange={this.updateSelected}
                mode='dropdown'>
                {this.getPickerOptions()}
              </Picker>
              <View style={styles.contentContainer}>
                <Resource
                  veteranId={this.props.navigation.state.params.id}
                  categories={this.state.categories}
                  categoriesToDisplay={[this.state.selected_category]}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.stillLoading) {
      return (
        <View />
      );
    } else {
      return (
        <View style={{flex: 1,}}>
          {this.renderResourceContent()}
        </View>
      );
    }
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
    fontFamily: 'source-sans-pro-regular',
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
    color: "rgb(0,0,0)",
  },
});
