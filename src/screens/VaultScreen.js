import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
  FlatList,
  ItemSeparatorComponent,
} from 'react-native';

import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';
import { colors } from '../styles/colors';
import { APIRoutes } from '../helpers/routes/routes';
import BaseRequester from '../helpers/requesters/BaseRequester';
import Resource from '../components/Resource';
import CategoryRequester from '../helpers/requesters/CategoryRequester';
import { List, ListItem } from 'react-native-elements';

export default class VaultScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      categories: [],
      resources: [],
      stillLoading: true,
    };
  }

  componentDidMount() {
    CategoryRequester.retrieveCategories().then((response) => {
      this.setState({ categories: response, stillLoading: false });
    })
  }

  getData = () => {
    return this.state.categories.map((category, i) => {
        return {key: category.name, id: category.id};
    });
  };

  updateSelected = (item) => {
    let params = { 
      // TODO: fix
      veteranId: this.props.navigation.state.params.id,
      // veteranId: 1,
      categories: this.state.categories,
      categoryToDisplay: item.id,
      title: item.key,
    };
    this.props.navigation.navigate('Resource', params);
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  renderResourceContent = () => {
    return (
      <View style={ styles.backgroundContainer }>
        <View style={{flex: 1,}}>
          <View style={ styles.contentContainer }>
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                ItemSeparatorComponent={this.renderSeparator}
                data={this.getData()}
                renderItem={({ item }) => (
                <ListItem 
                  titleStyle={ styles.listItemTitle }
                  title={`${item.key}`}
                  containerStyle={{ borderBottomWidth: 0 }}
                  onPress={this.updateSelected.bind(this, item)}
                />
              )}
              />
            </List>
          </View>
        </View>
      </View>
    );
  };

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
    paddingLeft: 10,
    paddingTop: 10,
  },
  bodyText: {
    fontSize: 12,
    fontFamily: 'source-sans-pro-regular',
  },
  contentContainer: {
    flexDirection:'column',
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
  listItemTitle: {
    fontFamily: 'source-sans-pro-regular',
    fontSize: 22,
  },
});
