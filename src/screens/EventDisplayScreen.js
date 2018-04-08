import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, TextInput, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import{ Container, Content, Header, Form, Input, Item, Label} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

class EventDisplayScreen extends React.Component{

  render(){
    return(
      <View style = {{flex: 1, flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
        <Text>"Hello World"</Text>
      </View>
  )
  }

}

export default EventDisplayScreen;
