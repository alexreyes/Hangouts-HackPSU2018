import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, TextInput, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import{ Container, Content, Header, Form, Input, Item, Label} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import HomeScreen from "./src/screens/HomeScreen.js";
import LoginSignUpScreen from "./src/screens/LoginSignUpScreen.js"
import Firebase from "./src/firebaseConfig.js";

const RootStack = StackNavigator({
  LoginSignUp:{
    screen: LoginSignUpScreen
  },
  Home:{
    screen: HomeScreen
  }
},
{
  initialRouteName: 'LoginSignUp'
});

export default class Main extends React.Component {
  render(){
    return <RootStack />
  }
}
