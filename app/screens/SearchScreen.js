import React, { Component } from 'react';

import ResultSearchScreen from './ResultSearchScreen';
import HeaderSearch from '../components/Headers/HeaderSearch';

import * as firebase from 'firebase';
import { Container, Text, Content } from 'native-base';
import { 
  StyleSheet
} from 'react-native';

export default  class SearchScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText:""
    };

  }

  register(text){
    this.setState({
        searchText: text
    });
  }

  render() {
    return (
      <Container>
        <HeaderSearch register={this.register.bind(this)} searchText={this.state.searchText} />
        <ResultSearchScreen searchText={this.state.searchText} navigation={this.props.navigation} />
      </Container>
    );
  }
}