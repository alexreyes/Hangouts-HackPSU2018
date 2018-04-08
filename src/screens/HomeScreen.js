import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, TextInput, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import{ Container, Content, Header, Form, Input, Item, Label} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import Firebase from "../firebaseConfig.js";

class HomeScreen extends React.Component {

  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  logOutUser = () =>{
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  componentWillMount() {
    Firebase.init();
    Firebase.auth.onAuthStateChanged(user => {
      if (user != null) {
      } else {
        this.setState({ logInStatus: 'You are currently logged out.' });
        this.resetNavigation("LoginSignUp");
      }
    });
  }

  render(){
    return (
      <View style = {{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}} >
        <View style = {{width: '100%', height: 40, backgroundColor:"skyblue"}}>
          <Button
            title="Events"
            onPress={() => this.props.navigation.navigate("EventDisplay")}
          />
        </View>

        <Button
          title="Log Out"
          onPress={()=> this.logOutUser()}
        />
      </View>
    );
  }
}

export default HomeScreen;
