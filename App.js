import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, TextInput, Text, View } from 'react-native';
import * as firebase from 'firebase';
import{ Container, Content, Header, Form, Input, Item, Label, Button} from 'native-base';
import { StackNavigator } from 'react-navigation';
import NewPage from './NewPage.js';
import MapView , {PROVIDER_GOOGLE} from 'react-native-maps';
const config = {
    apiKey: "AIzaSyBuul15OuC_PfDjE_gcZPtchTW4yviSUM0",
    authDomain: "hangouts-c7705.firebaseapp.com",
    databaseURL: "https://hangouts-c7705.firebaseio.com",
    projectId: "hangouts-c7705",
    storageBucket: "hangouts-c7705.appspot.com"
  };

const firebaseApp = firebase.initializeApp(config);
const auth = firebase.auth();

class HomeScreen extends React.Component {

  logOutUser = () =>{
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user != null) {
      } else {
        this.setState({ logInStatus: 'You are currently logged out.' });
        this.props.navigation.navigate('LoginSignUp')
      }
    });
  }

  render(){
    return (
      <View>
        <Text>Hello</Text>
        <Button style={{ marginTop:25 }} rounded success
                onPress={()=> this.logOutUser()}>
          <Text style={{color:'white', textAlign:'center'}}>Log Out</Text>
        </Button>
        <Button style={{ marginTop:25 }} 
                onPress = {()=> this.prop.navigation.navigate("MapsPage")}>
              <Text style={{color:'white', textAlign:'center'}}>Maps Page</Text>
            </Button>
      </View>
    );
  }
}
class MapsPage extends React.Component {
  render() {
    return (
      <View>
        <MapView
          provider= {PROVIDER_GOOGLE}
          style = {styles.container}
          customMapStyle = {Aubergine}
          initialRegion={{
            latitude:  39.7392,
            longitude: -104.9903, 
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421,
          }}
        />
        </View>
    );
  }
}
class LoginSignUpScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user != null) {
        this.setState({ logInStatus: 'We are authenticated now!' });
        this.props.navigation.navigate('Home')
      } else {
        this.setState({ logInStatus: 'You are currently logged out.' });
      }
    });
  }

  signUpUser = (email,password) =>{
    try{
      if(this.state.password.length<6){
        alert('MORE CHARACTERS')
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch(error) {
      console.log(error.toString())
    }
  }

  loginUser = (email,password) =>{
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
        console.log(user)
      })
    } catch(error) {
      console.log(error.toString())
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input autoCorrect={false} autoCapitalize="none"
                    onChangeText={(email)=>this.setState({email})}/>
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input autoCorrect={false} autoCapitalize="none" secureTextEntry={true}
                    onChangeText={(password)=>this.setState({password})}/>
          </Item>

          <View style={{alignSelf:'center'}}>
            <Button style={{ marginTop:25 }} rounded success
                    onPress={()=> this.loginUser(this.state.email,this.state.password)}>
              <Text style={{color:'white', textAlign:'center'}}>Login</Text>
            </Button>
          </View>

          <View style={{alignSelf:'center'}}>
            <Button style={{ marginTop:25 }} rounded primary
                    onPress={()=> this.signUpUser(this.state.email,this.state.password)}>
              <Text style={{color:'white', textAlign:'center'}}>Sign Up</Text>
            </Button>
          </View>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height: '100%', 
    width:'100%',
    flex:1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 50
  },
});

const RootStack = StackNavigator({
  LoginSignUp:{
    screen: LoginSignUpScreen
  },
  Home:{
    screen: HomeScreen
  },
  MapsPage:{
    screen: MapsPage
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