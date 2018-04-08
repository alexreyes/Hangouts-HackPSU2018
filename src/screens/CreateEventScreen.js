import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, TextInput, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import{ Container, Content, Header, Form, Input, Item, Label} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

class CreateEventScreen extends React.Component{
  static navigationOptions = {title: "Create New Event"}

  constructor(props){
    super(props)

    this.state = ({
      date: '',
      time: '',
      title: '',
      location: '',
      info: '',
    })
  }

  createNewEventInDB = () => {
    this.setState({
      info: this.state.date + this.state.time
    })
  }

  render(){
    return(
      <View style = {{flex:1 , flexDirection: "column", justifyContent: "flex-start", padding: 10}}>
        // date entry
        <Item floatingLabel>
          <Label>Date</Label>
          <Input onChangeText={(date)=>this.setState({date})}/>
        </Item>

        <Item floatingLabel>
          <Label>Time</Label>
          <Input onChangeText={(time)=>this.setState({time})}/>
        </Item>

        <Item floatingLabel>
          <Label>Title</Label>
          <Input />
        </Item>

        <Item floatingLabel>
          <Label>Location</Label>
          <Input />
        </Item>

        <Button
          title="Create..."
          onPress={()=> this.createNewEventInDB()}
        />

        <Text>{this.state.info}</Text>

      </View>


    )

  }

}

export default CreateEventScreen;
