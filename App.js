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
  FlatList
} from 'react-native';
import { 
  ThemeProvider,
  Button,
  Input,
  Avatar,
  ListItem
} from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Util from './library/Util';
import Login from './components/Login';
import Doctors from './components/Doctors';
import IndividualDoctor from './components/IndividualDoctor';
import Calendly from './components/Calendly';

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

function LogoTitle() {
  return (
    <Image
      style={[appstyles.logoheader]}
      source={require('./assets/logo.png')}
    />
  );
}

/*SCREENS*/
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
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Doctors">
          <Drawer.Screen name="Calendly" component={Calendly} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Doctors" component={Doctors} />
          <Drawer.Screen name="IndividualDoctor" component={IndividualDoctor} />
          <Drawer.Screen name="PaymentOptions" component={PaymentOptionsScreen} />
          <Drawer.Screen name="AppointmentSet" component={AppointmentSetScreen} />
        </Drawer.Navigator>       
      </NavigationContainer>
    </ThemeProvider>
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
    fontSize: 14
  }
});
