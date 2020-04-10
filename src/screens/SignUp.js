import React, { Component, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  Button,
  Input,
} from 'react-native-elements';
import * as firebase from 'firebase';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Util from '../library/Util';

const SignUp = props => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const [text, setText] = useState('');

  handleSignUp = () => {
    // setText(email);
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => console.log("login")).catch(error => setErrorMessage({ msg: error.message }));
  }

  return (
    <SafeAreaView style={[styles.container]}>
     <View style={styles.logocontainer}>
        <Image source={require('./../../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={[styles.formcontainer]}>
        {errorMessage &&
          <Text style={{ color: 'red', fontStyle: 'italic', }}>
            {errorMessage.msg}
          </Text>}
        <Text>{text}</Text>
        <Input
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(value) => setEmail(value)}
        />
        <Input
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(value) => setPassword(value)}
        />
        <Button title="SIGN UP" onPress={handleSignUp} />
        <TouchableOpacity        
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.graytext}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SignUp;

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
  formcontainer: { 
    flex: 1,
    width: '90%',
    padding: 10
  },
  graytext: {
    color: 'lightgray',
    fontSize: 10,
    textAlign: 'center',
  },
});