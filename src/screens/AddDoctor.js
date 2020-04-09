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

  function addDoctors(email, title, first, last, jobTitle, phone, cell, imageUrl) {
    // let userId = Util.uuidv4();
    let doctors = [
      {
        email: 'kirkhollohan@gmail.com',
        name: {
          title: 'Mr',
          first: 'Kirk',
          last: 'Hollohan',
        },
        jobTitle: 'General Practitioner',
        phone: '519-858-1MED (1633)',
        cell: '519-858-1MED (1633)',
        imageUrl: 'gs://authflow-b1864.appspot.com/doctors/kirk-ed.jpg',
      },
      {
        email: "abbie.rice@example.com",
        name: {
          title: "Ms",
          first: "Abbie",
          last: "Rice",
        },
        jobTitle: "Pediatrician",
        phone: "016973 04665",
        cell: "0780-582-221",
        imageUrl: "gs://authflow-b1864.appspot.com/doctors/42.jpg",
      },
      {
        email: "elmer.hale@example.com",
        name: {
          title: "Mr",
          first: "Elmer",
          last: "Hale",
        },
        jobTitle: "Family Medicine",
        phone: "016973 61283",
        cell: "0748-400-903",
        imageUrl: "gs://authflow-b1864.appspot.com/doctors/66.jpg",
      },
      {
        email: "connor.rhodes@example.com",
        name: {
          title: "Mr",
          first: "Connor",
          last: "Rhodes",
        },
        jobTitle: "General Surgery",
        phone: "(387)-760-8082",
        cell: "(122)-458-0537",
        imageUrl: "gs://authflow-b1864.appspot.com/doctors/1.jpg",
      },
      {
        email: "amelia.ross@example.com",
        name: {
          title: "Ms",
          first: "Amelia",
          last: "Ross"
        },
        jobTitle: "Psychiatry",
        phone:  "01695 47504",
        cell: "0759-551-515",
        imageUrl: "gs://authflow-b1864.appspot.com/doctors/90.jpg",
      },
      {
        email: "scott.gonzalez@example.com",
        name: {
          title: "Mr",
          first: "Scott",
          last: "Gonzalez"
        },
        jobTitle: "Neurology",
        phone:  "013873 72340",
        cell:"0762-387-508",
        imageUrl: "gs://authflow-b1864.appspot.com/doctors/59.jpg",
      },
      {
        email: "christy.peters@example.com",
        name: {
          title: "Mrs",
          first: "Christy",
          last: "Peters"
        },
        jobTitle: "Pathology",
        phone: "(077)-989-4223",
        cell: "(957)-508-2953",
        imageUrl: "gs://authflow-b1864.appspot.com/doctors/0.jpg",
      },
      {
        email: "walter.watkins@example.com",
        name: {
          title: "Mr",
          first: "Walter",
          last: "Watkins"
        },
        jobTitle: "Psychiatry",
        phone: "(641)-919-7582",
        cell: "(219)-785-5769",
        imageUrl: "gs://authflow-b1864.appspot.com/doctors/28.jpg",
      },
      {
        email: "tamara.hayes@example.com",
        name: {
          title: "Mrs",
          first: "Tamara",
          last: "Hayes"
        },
        jobTitle: "Family Medicine",
        phone: "(210)-074-3089",
        cell: "(158)-578-4471",
        imageUrl: "gs://authflow-b1864.appspot.com/doctors/51.jpg",
      },
      {
        email: "abigail.sutton@example.com",
        name: {
          title: "Ms",
          first: "Abigail",
          last: "Sutton"
        },
        jobTitle: "Internal Medicine",
        phone: "(576)-963-7561",
        cell: "(214)-776-8466",
        imageUrl: "gs://authflow-b1864.appspot.com/doctors/96.jpg",
      },
      {
        email: "juliette.park@example.com",
        name: {
          title: "Mrs",
          first: "Juliette",
          last: "Park"
        },
        jobTitle: "General Practitioner",
        phone: "384-764-2568",
        cell:  "939-130-5779",
        imageUrl: "gs://authflow-b1864.appspot.com/doctors/29.jpg",
      },
      {
        email: "don.phillips@example.com",
        name: {
          title: "Mr",
          first: "Don",
          last: "Phillips"
        },
        jobTitle: "General Practitioner",
        phone: "(284)-155-0862",
        cell: "(445)-016-8904",
        imageUrl: "gs://authflow-b1864.appspot.com/doctors/45.jpg",
      },
    ];

    doctors.map((doctor) => {
      firebase.database().ref('Doctors/').push(doctor).then((data)=>{
          setText(JSON.stringify(data));
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      });
    })
    /*firebase.database().ref('Doctors/').push(doctors).then((data)=>{
        setText(JSON.stringify(data));
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });*/
  }
      //"phone":"(293)-404-3040","cell":"(280)-310-4657"
      // "timezone":{
      //   "offset":"-5:00",
      //   "description":"Eastern Time (US & Canada), Bogota, Lima"
      // gs://authflow-b1864.appspot.com/92.jpg
      // }
      // {
      //   email: email,
      //   name: {
      //     title: title,
      //     first: first,
      //     last: last,
      //   },
      //   jobTitle: jobTitle,
      //   phone: phone,
      //   cell: cell,
      //   imageUrl: imageUrl,
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
          addDoctors(email, title, first, last, jobTitle, phone, cell, imageUrl);
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