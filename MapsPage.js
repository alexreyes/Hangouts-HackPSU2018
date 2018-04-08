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
