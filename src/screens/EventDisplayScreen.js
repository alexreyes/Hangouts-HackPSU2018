import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, TextInput, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import{ Container, Content, Header, Form, Input, Item, Label} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import Firebase from "../firebaseConfig.js";

class EventDisplayScreen extends React.Component{

  componentWillMount() {
    Firebase.init();
  }

  pushEvent = (dateVal, timeVal, titleVal, locationVal) =>{
    firebase.database().ref(firebase.auth().currentUser.uid).set(
      {
        date: dateVal,
        time: timeVal,
        title: titleVal,
        location: locationVal
      }
    ).then(() => {
      console.log('It worked');
    }).catch((error) => {
      console.log('NOPE DIDNT WORK');
    });
  }

  render(){
    this.pushEvent('hello','hello','hello','hello')
    
    firebase.database().ref().on('value', (data)=>{
      console.log(data.toJSON());
    })

    return(
      <View style ={{flex:1, flexDirection:"column",justifyContent:"space-between"}}>

        // view area where the event object buttons will go
        <View style = {{flex: 1, flexDirection:"column", justifyContent:"flex-start", alignItems:"center"}}>
            <Text>"Hello There everyone!"</Text>
        </View>

        // renders the create event button
        <View style = {{alignSelf:"flex-end", backgroundColor:"blue"}}>
          <Button
            title="Create Event..."
            color="white"
            onPress={() => this.props.navigation.navigate("CreateEvent")}
          />
        </View>

      </View>
  )}

}

export default EventDisplayScreen;
