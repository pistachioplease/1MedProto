import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.logocontainer}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.btnsignup}>
            <Text style={styles.btnsignuptext}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnlogin}>
            <Text style={styles.btnlogintext}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
});
