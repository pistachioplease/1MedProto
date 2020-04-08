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
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [cell, setCell] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  function writeUserData(email, title, first, last, jobTitle, phone, cell, imageUrl) {
    userId = Util.uuidv4();
    firebase.database().ref('doctors/' + userId).set({
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
          setText(JSON.stringify({
            userId:  Util.uuidv4(),
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
          }));
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