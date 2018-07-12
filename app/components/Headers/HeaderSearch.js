import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input } from 'native-base';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';

export default class HeaderSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query:""
    };

  }

  _initSearch(text) {
    this.setState({query: text});
    this._search(text);
  }

  _search(text) {
    let that = this;
    setTimeout(function(){
      if(text == that.state.query){
        that.props.register(text);
      }
    }, 800);
  }

  _clearSearch() {

  }

  render() {
    return (

        <Header>
          <StatusBar hidden={true} />
          <Left style={{flex: 0.2}} >
            <Image
                style={{width: 40, height: 40}}
                source={require('../../assets/img/logo-white.png')}
              />
          </Left>
          <Body style={{flex: 0.6}}>
            <Item>
              <Icon active name='search' style={styles.white} />
              <Input onChangeText={(text) => this._initSearch(text)} onClearText={this._clearSearch()} placeholderTextColor={'white'}  style={styles.white} placeholder="Recherche" />
            </Item>
          </Body>
          <Right style={{flex: 0.2}}>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>

    );
  }
}

const styles = StyleSheet.create({
  white: {
    color: 'white',
  },
});
