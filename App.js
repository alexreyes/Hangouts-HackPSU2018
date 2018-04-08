import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, TextInput, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import{ Container, Content, Header, Form, Input, Item, Label} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

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
    auth.onAuthStateChanged(user => {
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
        <Button
          title="Log Out"
          onPress={()=> this.logOutUser()}
        />
      </View>
    );
  }
}

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
    auth.onAuthStateChanged(user => {
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

const styles = StyleSheet.create({
  container:{
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

// RANDOM HELPFUL REFS
// class Greeting extends Component {
//   render() {
//     return (
//       <Text>Hello {this.props.name}!</Text>
//     );
//   }
// }
//
// class Blink extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {isShowingText: true};
//
//     // Toggle the state every second
//     setInterval(() => {
//       this.setState(previousState => {
//         return { isShowingText: !previousState.isShowingText };
//       });
//     }, 1000);
//   }
//
//   render() {
//     let display = this.state.isShowingText ? this.props.text : ' ';
//     return (
//       <Text>{display}</Text>
//     );
//   }
// }
//
// class PostImage extends Component {
//   render() {
//     let pic = {
//       uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
//     };
//     return (
//       <Image source={pic} style={{width: '75%', height: 110}}/>
//     );
//   }
// }
//
// class InputText extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {text: ''};
//   }
//
//   render() {
//     return (
//       <View style={{width:'50%', padding: 10}}>
//         <TextInput
//           style={{height: 40}}
//           placeholder="Type here to translate!"
//           onChangeText={(text) => this.setState({text})}
//         />
//         <Text style={{padding: 10, fontSize: 42}}>
//           {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
//         </Text>
//       </View>
//     );
//   }
// }
//
// class ButtonTest extends Component {
//   _onPressButton() {
//     Alert.alert('You tapped the button!')
//   }
//
//   render() {
//     return (
//       <View style={{flex:1, flexDirection:'column', margin:10}}>
//         <View>
//           <Button
//             onPress={this._onPressButton}
//             title="Press Me"
//           />
//         </View>
//
//         <View style={{marginTop:10}}>
//           <Button
//             color='red'
//             onPress={this._onPressButton}
//             title="Press Me"
//           />
//         </View>
//       </View>
//     );
//   }
// }
