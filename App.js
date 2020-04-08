import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import Util from './src/library/Util';
import Login from './src/screens/Login';
import Doctors from './src/screens/Doctors';
import IndividualDoctor from './src/screens/IndividualDoctor';

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
function PaymentOptions({ route, navigation } ) { 
  return (
    <View style={appstyles.container}>
      <Text>PaymentOptionsScreen</Text>      
    </View>
  );
}

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode='none'>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Doctors" component={Doctors} />
      <Stack.Screen name="IndividualDoctor" component={IndividualDoctor} />
      <Stack.Screen name="PaymentOptions" component={PaymentOptions} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootStack />
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
