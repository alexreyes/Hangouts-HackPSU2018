import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

class MapsScreen extends Component {
    static navigationOptions = { title: 'Welcome', headerMode:'MapsScreen'};
    render() {
      return (
        <MapView
          style = {styles.mapsStyle}
          initialRegion={{
            latitude: 40.798211,
            longitude: -77.861141,
            latitudeDelta: .001,
            longitudeDelta: .1,
          }}
        />
      );
    }
  }

const styles = StyleSheet.create({
    mapsStyle: { 
        width: '100%', 
        height: '100%'
    }
})
export default MapsScreen;