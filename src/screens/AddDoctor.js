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

const AddDoctor = props => {
  const navigation = useNavigation();

  const [text, setText] = useState('');
  const [email, setEmail] = useState('angbagongako@gmail.com');
  const [title, setTitle] = useState('Mr.');
  const [first, setFirst] = useState('Kirk');
  const [last, setLast] = useState('Hollohan');
  const [jobTitle, setJobTitle] = useState('General Practitioner');
  const [phone, setPhone] = useState('(293)-404-3040');
  const [cell, setCell] = useState('(280)-310-4657');
  const [imageUrl, setImageUrl] = useState('gs://authflow-b1864.appspot.com/92.jpg');

  function writeUserData(email, title, first, last, jobTitle, phone, cell, imageUrl) {
    let userId = Util.uuidv4();
    firebase.database().ref('Doctors/').push({
      id: userId,
      email: email,
      name: {
        title: title,
        first: first,
        last: last,
      },
      jobTitle: jobTitle,
      phone: phone,
      cell: cell,
      imageUrl: imageUrl,
    }).then((data)=>{
        setText(JSON.stringify(data));
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
  }
      //"phone":"(293)-404-3040","cell":"(280)-310-4657"
      // "timezone":{
      //   "offset":"-5:00",
      //   "description":"Eastern Time (US & Canada), Bogota, Lima"
      // gs://authflow-b1864.appspot.com/92.jpg
      // }

  return (
    <View style={[styles.container]}>
      <Input placeholder='email' onChangeText={ (value) => setEmail(value) } />
      <Input placeholder='title' onChangeText={ (value) => setTitle(value) } />
      <Input placeholder='first' onChangeText={ (value) => setFirst(value) } />
      <Input placeholder='last' onChangeText={ (value) => setLast(value) } />
      <Input placeholder='jobTitle' onChangeText={ (value) => setJobTitle(value) } />
      <Input placeholder='phone' onChangeText={ (value) => setPhone(value) } />
      <Input placeholder='cell' onChangeText={ (value) => setCell(value) } />
      <Input placeholder='imageUrl' onChangeText={ (value) => setImageUrl(value) } />
      <Button 
        title="Add"
        onPress={ () => {
          writeUserData(email, title, first, last, jobTitle, phone, cell, imageUrl);
        }}
      />
      <Text>{text}</Text>
    </View>
  );
}

export default AddDoctor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
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