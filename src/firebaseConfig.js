import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBuul15OuC_PfDjE_gcZPtchTW4yviSUM0",
    authDomain: "hangouts-c7705.firebaseapp.com",
    databaseURL: "https://hangouts-c7705.firebaseio.com",
    projectId: "hangouts-c7705",
    storageBucket: "hangouts-c7705.appspot.com"
  };

firebase.initializeApp(config);

export default class Firebase {

  static auth;

  static init(){
    Firebase.auth = firebase.auth();
  }

}
