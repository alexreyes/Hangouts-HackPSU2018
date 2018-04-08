import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, TextInput, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import{ Container, Content, Header, Form, Input, Item, Label} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
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

// defining the method that will reset the user to the login screen with no back option
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'LoginSignUp'})],
});

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
        this.props.navigation.dispatch(resetAction);
      }
    });
  }

  render(){
    return (
      <View style = {{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}} >
        <Button
          title="Log Out"
          onPress={()=> this.logOutUser()}
        />
        <Button 
            title = "Maps Page"
            onPress={() => this.props.navigation.navigate('MapsPage')
          }
        />
      </View>
    );
  }
}

class MapsPage extends Component {
  static navigationOptions = { title: 'Welcome', headerMode:'MapsPage'};
  render() {
    return (
      <MapView
        style = {styles.mapsStyle}
        initialRegion={{
          latitude: 40.798211,
          longitude: -77.861141,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
            <Button
              title="Login"
              onPress={()=> this.loginUser(this.state.email,this.state.password)}
            />
          </View>

          <View style={{alignSelf:'center'}}>
            <Button
              onPress={()=> this.signUpUser(this.state.email,this.state.password)}
              title="Sign Up"
            />
          </View>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 50
  },
  mapsStyle: {
    width:'100%', 
    height:'100%',
  }
});

const RootStack = StackNavigator({
  LoginSignUp:{
    screen: LoginSignUpScreen
  },
  Home:{
    screen: HomeScreen
  },
  MapsPage:{
    screen: MapsPage,
  },
  },
  { 
    headerMode: 'MapsPage' 
  },
{
  initialRouteName: 'LoginSignUp'
  
});

export default class Main extends React.Component {
  render(){
    return <RootStack />
  }
}