import React, { Component } from 'react';
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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Util from '../library/Util';

const Login = props => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container]}>
      <View style={styles.logocontainer}>
        <Image source={require('./../../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={[styles.formcontainer, styles.debugBox]}>
        <Input
          label='USERNAME'
        />
        <Input
          label='PASSWORD'
        />
        <Text style={styles.textforgotpassword}>Forgot Password?</Text>

        <Button
          title="LOGIN" 
          onPress={() => 
            navigation.navigate('Doctors')
          } 
        />
        <Text style={styles.graytext}>OR CONNECT WITH</Text>
        <Button
          icon={
            <Icon
              name="google"
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
            navigation.navigate('Doctors')
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
    marginBottom: 10
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