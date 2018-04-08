import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, TextInput, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import{ Container, Content, Header, Form, Input, Item, Label} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import Firebase from "../firebaseConfig.js";


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 50
  },
});

class LoginSignUpScreen extends React.Component {

  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  componentWillMount() {
    Firebase.init();
    Firebase.auth.onAuthStateChanged(user => {
      if (user != null) {
        this.setState({ logInStatus: 'We are authenticated now!' });
        this.resetNavigation("Home");
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

export default LoginSignUpScreen;
