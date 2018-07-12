import React from 'react';
import { StackNavigator } from 'react-navigation';
import SearchScreen from '../screens/SearchScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { 
  Image
} from 'react-native';

export const HomeNavigation = StackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  }, 
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
		title: `${navigation.state.params.name}`,
		headerStyle: {backgroundColor: '#3B5BB3', elevation: 1},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontSize: 16,
		},
    }),
  }
});