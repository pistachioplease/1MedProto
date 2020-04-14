import React, { Component, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
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

const Login = props => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  
  async function handleSignIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        // console.log(JSON.stringify(res.user));
         Util.storeUser(res.user);
       })
      .catch(error => setErrorMessage({ msg: error.message }))
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.logocontainer}>
        <Image source={require('./../../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={[styles.formcontainer]}>
        {errorMessage &&
          <Text style={{ color: 'red', fontStyle: 'italic', }}>
            {errorMessage.msg}
          </Text>}
        <Input
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => setEmail(email)}
        />
        <Input
          secureTextEntry
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => setPassword(password)}
        />
        <Text style={styles.textforgotpassword}>Forgot Password?</Text>

        <Button
          title="LOGIN" 
          onPress={handleSignIn} 
        />
        <Text style={styles.graytext}>Don't have an account?</Text>
        <Button
          icon={
            <Icon
              name="sign-in"
              size={20}
              color='firebrick'
            />
          }
          title=" SIGN UP" 
          type="outline"
          buttonStyle={{
            backgroundColor: 'white',
          }}
          onPress={() => 
            navigation.navigate('SignUp')
          } 
        />

      </View>
    </View>
  );
}

export default Login;

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
  textforgotpassword: {
    color: 'lightgray',
    fontSize: 10,
    textAlign: 'right',
    marginBottom: 10,
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