import React, { Component } from 'react';

import { 
  Content, 
  Item, 
  Input, 
  Spinner, 
  Button, 
  List, 
  ListItem, 
  Thumbnail, 
  Text, 
  Body, 
  Right, 
  Icon 
} from 'native-base';

import { 
  StyleSheet, 
  View
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import '../config/global';
import * as firebase from 'firebase';

export default class ResultSearchScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoading: false,
      user: null,
      dataSource: [],
      access_token: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
       if (user) {
        this.setState({ user: user }); 
        that = this;
        firebase.database().ref('/users/' + user.providerData[0].uid).once('value').then(function(snapshot) {
          fbToken = (snapshot.val() && snapshot.val().fbToken) || '';
          console.log(fbToken);
          that.setState({ access_token: fbToken });
        });

      } else {
        this.setState({ loading: false, authenticated: false });
      }
     });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.searchText != '' && nextProps.searchText != null && nextProps.searchText != this.props.searchText){
      this.setState({isLoading: true});
      return fetch(global.FB_GRAPH_URL + 'search?type=user&q=' + nextProps.searchText + '&fields=id,name,picture.width(350).height(350),cover,link&access_token=' + this.state.access_token )
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.data == undefined) {
          this.setState({
            error: true,
            isLoading: false
          });
        }
        else {
          this.setState({
            isLoading: false,
            dataSource: responseJson.data,
          }, function() {
            // todo debug new state
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }

  }

	render() {

    //Si input de recherche non vide
    if(this.props.searchText !== '' && this.props.searchText !== null) {
      if (this.state.isLoading) {
        //On affiche un spinner
        return (
          <Content>
            <Spinner color='blue' />
          </Content>
        );
      }


      //Si il y a une erreur
      if(this.state.error) {
        return (
          <Content>
            <Text>Une erreur est survenue.</Text>
          </Content>
        );
      }
      
      //Quand c'est chargé on affiche les résultats
      return (
        <Content>
          <List dataArray={this.state.dataSource}
            renderRow={(item) =>
              <ListItem
                onPress={() =>
                  this.props.navigation.navigate('Profile', item)
                }
                style={{
                  marginLeft: 0, paddingLeft: 20
                }}
              >
                <Thumbnail square size={80} source={{ uri: item.picture.data.url }} />
                <Body>
                  <Text>{item.name}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            }>
          </List>
        </Content>
      );
    }
    return null;
	}

}