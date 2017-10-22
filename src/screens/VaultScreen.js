import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, TextInput, View, ScrollView, TouchableHighlight } from 'react-native';
import { Font } from 'expo';
import Icon from '@expo/vector-icons/FontAwesome';
import { imageStyles } from '../styles/images';
import { layoutStyles } from '../styles/layout';

export default class VaultScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Vault',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="briefcase" size={22} color="#e91e63" />
    ),
  };

  async componentDidMount() {
    await Font.loadAsync({
      'source-sans-pro-black': require('../.././assets/fonts/SourceSansPro-Black.ttf'),
      'source-sans-pro-black-italic': require('../.././assets/fonts/SourceSansPro-BlackItalic.ttf'),
      'source-sans-pro-bold': require('../.././assets/fonts/SourceSansPro-Bold.ttf'),
      'source-sans-pro-bold-italic': require('../.././assets/fonts/SourceSansPro-BoldItalic.ttf'),
      'source-sans-pro-extra-light': require('../.././assets/fonts/SourceSansPro-ExtraLight.ttf'),
      'source-sans-pro-extra-light-italic': require('../.././assets/fonts/SourceSansPro-ExtraLightItalic.ttf'),
      'source-sans-pro-italic': require('../.././assets/fonts/SourceSansPro-Italic.ttf'),
      'source-sans-pro-light': require('../.././assets/fonts/SourceSansPro-Light.ttf'),
      'source-sans-pro-light-italic': require('../.././assets/fonts/SourceSansPro-LightItalic.ttf'),
      'source-sans-pro-regular': require('../.././assets/fonts/SourceSansPro-Regular.ttf'),
      'source-sans-pro-semibold': require('../.././assets/fonts/SourceSansPro-SemiBold.ttf'),
      'source-sans-pro-semibold-italic': require('../.././assets/fonts/SourceSansPro-SemiBoldItalic.ttf'),
    });
    this.setState({fontLoaded: true});
  }
  constructor(props) {
    super(props);
    this.state = {
      titleName: "Resources",
      searchText: '',
      filter: [],
      names: [
        {name: 'CLEAR', selected:false, id: 1},
        {name: 'FINANCE', selected:true, id: 2},
        {name: 'HOUSING', selected:true, id: 3},
        {name: 'EMPLOYMENT', selected:true, id: 4},
        {name: 'LEGAL', selected:true, id: 5},
        {name: 'MENTAL HEALTH', selected:true, id: 6},
      ],
      fontLoaded: false,
      resources: [
        {title: 'Title of Resource',
          partner_org: 'Name of Partner Org',
          date:'8 Oct 2018',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et aliquam neque. Proin lectus neque, tincidunt eget elementum sit amet, rhoncus ut libero.',
          link: 'something',
          upvotes: 0,
          id: 1,
        },
        {title: 'Title of Resource',
          partner_org: 'Name of Partner Org',
          date:'8 Oct 2018',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et aliquam neque. Proin lectus neque, tincidunt eget elementum sit amet, rhoncus ut libero.',
          link: 'something',
          upvotes: 0,
          id: 2,
        },
        {title: 'Title of Resource',
          partner_org: 'Name of Partner Org',
          date:'8 Oct 2018',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et aliquam neque. Proin lectus neque, tincidunt eget elementum sit amet, rhoncus ut libero.',
          link: 'something',
          upvotes: 0,
          id: 3,
        }
      ]
    };
  }
  updateFilter(item_id, new_state) {
    var names_arr = this.state.names.slice()
    for(var i = 0; i < names_arr.length; i++) {
      if(names_arr[i].id == item_id) {
        names_arr[i].selected = new_state;
      }
    };
    this.setState({names:names_arr});
  }
  setOpposite(item_id) {
    for(var i = 0; i < this.state.names.length; i++) {
      if(this.state.names[i].id == item_id) {
        this.updateFilter(item_id, !this.state.names[i].selected);
      }
    };
  }
  falseState(name, item_id) {
    if(name=='Clear') {
      for(var i = 1; i < this.state.names.length; i++) {
        this.updateFilter(this.state.names[i].id, false)
      }
    } else {
      this.setOpposite(item_id);
    }
  }
  filterScroller() {
    return this.state.names.map((item) => {
      if (item.selected==false) {
        return (
          <TouchableHighlight key = {item.id} style={styles.item} onPress={() => {this.falseState(item.name, item.id);}}>
            <Text style={{color:'white', fontSize:12, fontFamily: 'source-sans-pro-semibold',}}>{item.name}</Text>
          </TouchableHighlight>
        );
      } else {
        return (
          <TouchableHighlight key = {item.id} style = {[styles.item, {backgroundColor:'white',}]} onPress={() => {this.setOpposite(item.id);}}>
            <Text style={{color:'black', fontSize:12, fontFamily: 'source-sans-pro-semibold',}}>{item.name}</Text>
          </TouchableHighlight>
        );
      }
    })
  }
  upvote(item_id) {
    var resources_arr = this.state.resources.slice()
    for(var i = 0; i < resources_arr.length; i++) {
      if(resources_arr[i].id == item_id) {
        resources_arr[i].upvotes = resources_arr[i].upvotes+1;
      }
    };
    this.setState({resources:resources_arr});
  }
  displayResources() {
    return this.state.resources.map((item) => {
      return (
        <View key = {item.id} style={styles.contentPanel}>
          <Text style={styles.contentTitle}>{item.title}</Text>
          <View style={styles.contentInformation}>
            <View style={{justifyContent:'center'}}>
              <Text style={styles.partnerOrg}>{item.partner_org}</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft: 5,}}>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </View>
          <Text style={[styles.bodyText, {marginTop: 10,}]}>{item.description}</Text>
          <View style={[styles.contentInformation, {marginTop: 10,}]}>
            <View style={styles.button}>
              <Text style={{color:'white', fontSize:12, fontFamily: 'source-sans-pro-semibold',}}>OPEN RESOURCE</Text>
            </View>
            <View style={styles.upvote}>
              <TouchableHighlight onPress={() => {this.upvote(item.id);}}>
                <Text style={styles.upvoteText}>{item.upvotes}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    })
  }
  onSubmitEdit = () => {
    //add options
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow:1}} >
        {
          this.state.fontLoaded? (
            <View style={{flex:1}}>
              <View style={styles.backgroundContainer}>
                <View style={styles.backgroundDisplay}>
                </View>
                <View style={[styles.contentContainer, {top:0,}]}>
                  <Text style={[styles.baseText, {marginBottom: 5,}]}>
                    <Text style={[styles.titleText, {color:'rgb(255, 255, 255)'}]}>
                      {this.state.titleName}
                    </Text>
                  </Text>
                  <View style={[styles.search, {marginTop: 5,}]}>
                    <TextInput style={styles.searchBar} placeholderTextColor="rgba(255, 255, 255, 0.5)" placeholder="Search resources" onChangeText={(searchText) => this.setState({searchText})}/>
                  </View>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.filter}>  
                  {this.filterScroller()}
                </ScrollView>
                <View style={[styles.contentContainer, {top:125,}]}>
                  {this.displayResources()}
                </View>
              </View>
            </View>
          ) : null
        }
      </ScrollView>
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
    fontFamily: 'source-sans-pro-regular',
  },
  contentContainer: {
    flexDirection:'column',
    marginTop: 50,
    marginLeft:15,
    marginRight:15,
    position:'absolute',
    left:0,
    backgroundColor:'rgba(255, 255, 255, 0)',
    right: 0,
  },
  backgroundContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor:'#F2F2F2',
  },
  backgroundDisplay: {
    height: 400,
    width: 1000,
    transform: [{rotate: '-8deg'}],
    backgroundColor: '#B8C4D0',
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
    borderLeftColor: '#18B671',
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
    color: '#949494',
  },
  button: {
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 20,
    backgroundColor:'#18B671',
  },
  upvote: {
    justifyContent:'center',
    marginLeft: 10,
  },
  upvoteText: {
    //color: '#61D8F9',
    fontFamily: 'source-sans-pro-bold',
    fontSize: 12,
    color:'#949494',
  }
});