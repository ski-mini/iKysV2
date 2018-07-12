import React, { Component } from 'react';
import { Container, Content, Item, Spinner, Button, Thumbnail, Text, Body, Icon, ListItem, Right } from 'native-base';
import HeaderTitle from '../components/Headers/HeaderTitle';
import { 
  StyleSheet, 
  View,
  Image,
  Linking
} from 'react-native';
import '../config/global';
import * as firebase from 'firebase';

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      target: this.props.navigation.state.params,
      oneNight: false,
      sexFriends: false,
      standardRelationship: false,
      seriousRelationship: false,
      user: null,
      wish: [],
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
       if (user) {
        this.setState({ user: user }); 
        that = this;
        firebase.database().ref('/users/' + user.providerData[0].uid + '/target/' + this.state.target.id).once('value').then(function(snapshot) {
          wish = (snapshot.val() && snapshot.val().wish) || '';
          that.setState({ wish: wish });
          if(wish.indexOf('1') >= 0)
            that.setState({ oneNight: true });
          if(wish.indexOf('2') >= 0)
            that.setState({ sexFriends: true });
          if(wish.indexOf('3') >= 0)
            that.setState({ standardRelationship: true });
          if(wish.indexOf('4') >= 0)
            that.setState({ seriousRelationship: true });
        });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
     });
  }

  componentWillMount() {
    if(this.props.navigation.state.params.cover == undefined) {
      this.props.navigation.state.params.cover = 'http://';
    }
  }

  handleFbLink() {
    Linking.openURL(this.state.target.link).catch(err => console.error('An error occurred', err));
  }

  addOption(name, bool){
    bool = !bool;
    switch(name) {
      case 'oneNight':
        this.setState({ oneNight: bool});
        if(bool && this.state.wish.indexOf('1') == -1) {
          this.state.wish.push('1');
        }
        else {
          this.state.wish.splice(this.state.wish.indexOf('1'), 1);
        }
        break;
      case 'sexFriends':
        this.setState({ sexFriends: bool});
        if(bool && this.state.wish.indexOf('2') == -1) {
          this.state.wish.push('2');
        }
        else {
          this.state.wish.splice(this.state.wish.indexOf('2'), 1);
        }
        break;
      case 'standardRelationship':
        this.setState({ standardRelationship: bool});
        if(bool && this.state.wish.indexOf('3') == -1) {
          this.state.wish.push('3');
        }
        else {
          this.state.wish.splice(this.state.wish.indexOf('3'), 1);
        }
        break;
      case 'seriousRelationship':
        this.setState({ seriousRelationship: bool});
        if(bool && this.state.wish.indexOf('4') == -1) {
          this.state.wish.push('4');
        }
        else {
          this.state.wish.splice(this.state.wish.indexOf('4'), 1);
        }
        break;
    }

    firebase.database().ref('/users/' + user.providerData[0].uid + '/target/' + this.state.target.id).set({
      wish: [this.state.wish],
    });
  }

	render() {

    return (
      <Container>
      <Content>
        <View
          style={{
            flex: 1,
            backgroundColor: '#eee',
            flexDirection: 'column', 
            width: '100%',
          }}
        >
          <View
            style={{
              width: '100%',
              height: 200,
              backgroundColor: 'black',
            }}
          >
           
              <Image
                style={{
                  flex: 1,
                }}
                source={{ uri: this.state.target.cover.source }}
              />
          
          </View>
          <View
            style={{
              height: 150,
              width: '100%',
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -60,
            }}
          >
            <Image
              style={{
                resizeMode: 'center',
                height: 150,
                width: 150,
                borderWidth: 2,
                borderColor: 'white',
              }}
              source={{ uri: this.state.target.picture.data.url }}
            />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 28,
              }}
            >
              {this.state.target.name}
            </Text>
          </View>
          <Button block disabled style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 10 }}>
            <Text>Choississez votre envie</Text>
          </Button>
          <ListItem 
            style={styles.listItem} 
            onPress={() =>
              this.addOption('oneNight', this.state.oneNight)
            }
          >
            <Thumbnail square size={30} source={require('../assets/img/icons/one-night-icon.png')} />
            <Body>
              <Text>Coup d'un soir</Text>
            </Body>
            { this.state.oneNight &&
              <Right>
                <Icon ios='ios-checkmark' android="md-checkmark" style={styles.checkmark} />
              </Right>
            }
          </ListItem>
          <ListItem 
            style={styles.listItem} 
            onPress={() =>
              this.addOption('sexFriends', this.state.sexFriends)
            }
          >
            <Thumbnail square size={30} source={require('../assets/img/icons/sex-friends-icon.png')} />
            <Body>
              <Text>Sex friends</Text>
            </Body>
            { this.state.sexFriends &&
              <Right>
                <Icon ios='ios-checkmark' android="md-checkmark" style={styles.checkmark} />
              </Right>
            }
          </ListItem>
          <ListItem 
            style={styles.listItem} 
            onPress={() =>
              this.addOption('standardRelationship', this.state.standardRelationship)
            }
          >
            <Thumbnail square size={30} source={require('../assets/img/icons/standard-relationship-icon.png')} />
            <Body style={{marginHorizontal: 0}}>
              <Text>Se voir sans prise de tête</Text>
            </Body>
            { this.state.standardRelationship &&
              <Right>
                <Icon ios='ios-checkmark' android="md-checkmark" style={styles.checkmark} />
              </Right>
            }
          </ListItem>
          <ListItem 
            style={styles.listItem} 
            onPress={() =>
              this.addOption('seriousRelationship', this.state.seriousRelationship)
            }
          >
            <Thumbnail square size={30} source={require('../assets/img/icons/serious-relationship-icon.png')} />
            <Body>
              <Text>Déclarer sa flamme</Text>
            </Body>
            { this.state.seriousRelationship &&
              <Right>
                <Icon ios='ios-checkmark' android="md-checkmark" style={styles.checkmark} />
              </Right>
            }
          </ListItem>
          <Button 
            block iconLeft
            style={{ marginHorizontal: 30, marginVertical: 20 }}
            onPress={ () => this.handleFbLink() }
          >
            <Icon name='logo-facebook' style={{ color: 'white' }} />
            <Text uppercase={false} >Voir son profil Facebook</Text>
          </Button>
        </View>
        </Content>
      </Container>
    )
	}

}

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0, 
    paddingLeft: 20,
  },
  checkmark: {
    fontSize: 35,
    color: 'black',
  }
});