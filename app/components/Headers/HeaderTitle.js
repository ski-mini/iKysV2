import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import { 
  Image,
  StatusBar
} from 'react-native';

export default class HeaderTitle extends React.Component {

  render() {
    
    return (
      <Header>
        <StatusBar hidden={true} />
        <Left>
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>
            <Image
              style={{width: 40, height: 40}}
              source={require('../../assets/img/logo-white.png')}
            />
            iKys 2
          </Title>
        </Body>
      </Header>

    );
  }
}