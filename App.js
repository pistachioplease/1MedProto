import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView
} from 'react-native';
import { 
  ThemeProvider,
  Button,
  Input,
  Avatar,
  ListItem
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function LogoTitle() {
  return (
    <Image
      style={[appstyles.logoheader]}
      source={require('./assets/logo.png')}
    />
  );
}

/*SCREENS*/
function HomeScreen({ route, navigation } ) {
  /* get the param in route.params */
  const { username } = route.params;
  return (
    <View style={ [homescreenstyles.homescreencontainer] }>
      <Text>Hello, {JSON.stringify(username)}!</Text>
      <Button
        title="Go to Home... again"
        onPress={() => navigation.push('Home')}
      />
      <Button title="Go to Welcome Screen" onPress={() => navigation.navigate('Welcome')}  />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />
    </View>
  );
}

const homescreenstyles = StyleSheet.create({
  homescreencontainer: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
});

function WelcomeScreen({ navigation }) {
  return (
    <View style={appstyles.container}>
      <View style={appstyles.logocontainer}>
        <Image source={require('./assets/logo.png')} style={appstyles.logo} />
      </View>
      <View style={appstyles.buttoncontainer}>
        <TouchableOpacity 
          style={appstyles.btnsignup}
          onPress={() => 
            navigation.navigate('Home')
          }
        >
          <Text style={appstyles.btnsignuptext}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={appstyles.btnlogin} 
          onPress={() => 
            navigation.navigate('Home', {
              username: "Test User"
            })
          }
        >
          <Text style={appstyles.btnlogintext}>LOGIN</Text>
        </TouchableOpacity>        
      </View>
    </View>
  );
}

function LoginScreen({ navigation }) {
  return (
    <ThemeProvider theme={theme}>
      <View style={appstyles.container}>
        <View style={appstyles.logocontainer}>
          <Image source={require('./assets/logo.png')} style={appstyles.logo} />
        </View>
        <View style={[loginscreenstyles.formcontainer, appstyles.debugBox]}>
          <Input
            label='USERNAME'
          />
          <Input
            label='PASSWORD'
          />
          <Text style={loginscreenstyles.textforgotpassword}>Forgot Password?</Text>

          <Button
            title="LOGIN" 
            onPress={() => 
              navigation.navigate('DoctorsAvailable')
            } 
          />
          <Text style={loginscreenstyles.graytext}>OR CONNECT WITH</Text>
          <Button
            icon={
              <Icon
                name="google"
                size={20}
                color={theme.colors.primary}
              />
            }
            title=" SIGN UP" 
            type="outline"
            buttonStyle={{
              backgroundColor: 'white',
            }}
            onPress={() => 
              navigation.navigate('DoctorsAvailable')
            } 
          />

        </View>
      </View>
    </ThemeProvider>
  );
}

const loginscreenstyles = StyleSheet.create({
  formcontainer: { 
    flex: 1,
    width: '90%',
    padding: 10
  },
  graytext: {
    color: 'lightgray',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 10
  },
  textforgotpassword: {
    color: 'lightgray',
    fontSize: 10,
    textAlign: 'right',
    marginBottom: 10,
  }
});

const theme = {
  colors: {
    primary: 'firebrick'
  },
  Button: {
    raised: false,
    buttonStyle: {
      backgroundColor: 'firebrick',
      borderRadius: 20,
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 10
    },
  },
  iconContainerStyle: {
    paddingRight: 10,
  },
  ListItem: {

  }
};

const doctorList = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'General Practitioner'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Pediatrician'
  },
];

function DoctorsAvailableScreen({ route, navigation } ) { 
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [debugText, setDebugText] = useState([]);

  let jobTitles = [
    "Internal Medicine",
    "Pediatrician",
    "Family Medicine",
    "General Surgery",
    "Psychiatry",
    "Neurology",
    "Pathology",
    "Geriatrics",
  ];

  useEffect(() => {
      fetch('https://randomuser.me/api/?results=20&nat=us,gb,ca', {
        method: 'GET'        
      })
      .then(response => response.json())
      .then((responseJson)=> {
        setData(responseJson.results);
        setDebugText(responseJson.info);
        setLoading(false);
      })
      .catch(error=>console.log(error)) //to catch the errors if any
  }, []);

  if(isLoading){
    return( 
      <View style={appstyles.loader}> 
        <ActivityIndicator size="large" color="#0c9"/>
      </View>
  )};
  return (
    <ThemeProvider theme={theme}>
      <View style={doctoravailablescreenstyle.container}>
        <Text style={doctoravailablescreenstyle.screentitle}>Doctors Available Screen</Text>
       
        <Text style={appstyles.debugText}>{JSON.stringify(debugText)}</Text>
        <SafeAreaView style={doctoravailablescreenstyle.listcontainer}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ListItem
                key={item.login.uuid}
                leftAvatar={{ source: { uri: item.picture.thumbnail } }}
                title={capitalize(item.name.first) +" "+ capitalize(item.name.last)}
                subtitle={jobTitles[Math.floor(Math.random() * jobTitles.length)]}
                size="large"
                bottomDivider
                chevron
              />
            )}
          />
        </SafeAreaView>
      </View>
    </ThemeProvider>
  );
}

const doctoravailablescreenstyle = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  listcontainer: {
    flex: 1,
    width: "100%",
    flexDirection: 'column',
    marginTop: 10,
    justifyContent: 'flex-start'
  },
  indidoctor: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start"
  },
  screentitle: {
    color: 'slategray',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20
  }
});

function IndividualDoctorScreen({ route, navigation } ) { 
  return (
    <View style={appstyles.container}>
      <Text>IndividualDoctorScreen</Text>      
    </View>
  );
}

function PaymentOptionsScreen({ route, navigation } ) { 
  return (
    <View style={appstyles.container}>
      <Text>PaymentOptionsScreen</Text>      
    </View>
  );
}

function AppointmentSetScreen({ route, navigation } ) { 
  return (
    <View style={appstyles.container}>
      <Text>AppointmentSetScreen</Text>      
    </View>
  );
}

// const Stack = createStackNavigator();
/*<Stack.Navigator 
  initialRouteName="Welcome"
  screenOptions={{
    headerStyle: {
      backgroundColor: 'firebrick',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
>
  <Stack.Screen 
    name="Welcome" 
    component={WelcomeScreen} 
    options={{headerShown: false}}           
  />
  <Stack.Screen 
    name="Home" 
    component={HomeScreen} 
    options={{headerTitle: props => <LogoTitle {...props} />}}
    initialParams={{ username: "Other User" }}
  />
</Stack.Navigator>*/
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome">
        <Drawer.Screen name="Welcome" component={WelcomeScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} initialParams={{ username: "Other User" }} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="DoctorsAvailable" component={DoctorsAvailableScreen} />
        <Drawer.Screen name="IndividualDoctorn" component={IndividualDoctorScreen} />
        <Drawer.Screen name="PaymentOptions" component={PaymentOptionsScreen} />
        <Drawer.Screen name="AppointmentSet" component={AppointmentSetScreen} />
      </Drawer.Navigator>       
    </NavigationContainer>
  );
}

export default App;

const appstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  logocontainer: {
    flex: 1,
    width: '60%',
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  logoheader: {
    flex: 1,
    width: 80,
    height: 50,
    resizeMode: 'contain'    
  },
  buttoncontainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 80
  },
  btnsignup: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'lightgray',    
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
  },
  btnlogin: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'firebrick',
    borderRadius: 20,
  },
  btnsignuptext: {
    margin: 10,
    color: 'slategray',
  },
  btnlogintext: {
    margin: 10,
    color: 'white',
  },
  debugBox: {
    borderColor: 'pink',
    borderWidth: 1
  },
  debugText: {
    color: 'lightgray',
    fontStyle: 'italic',
    fontSize: 10
  }
});
