import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, TextInput, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import{ Container, Content, Header, Form, Input, Item, Label} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

class CreateEventScreen extends React.Component{
  static navigationOptions = {title: "Create New Event..."}

  render(){
    return(

      <Text>"Hello World"</Text>

    )

  }

}

export default CreateEventScreen;
