import React, { Component, useEffect, useState, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  AsyncStorage
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  ThemeProvider,
  Button,
  Input,
  Avatar,
  ListItem
} from 'react-native-elements';
import * as firebase from 'firebase';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Util from '../library/Util';
import { AuthContext } from '../navigation/AuthContext';

const Doctors = props => {
  const user = useContext(AuthContext); 
  const database = firebase.database();
  const storage = firebase.storage();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [debugText, setDebugText] = useState([]);

  function handleSignOut() {
    firebase.auth().signOut().then(() => console.log("logout")).catch(error => console.log(error));
  };
  //handleSignOut();

  async function getDoctors() {
    try {
      let doctorsFromAS = await AsyncStorage.getItem('doctors'); 

      if (doctorsFromAS == null){
        // console.log("load from DB");
        let ref = database.ref("Doctors");
        ref.on('value', snapshot => {
          let returnArray = [];

          snapshot.forEach(function(snap) {
            let newImageUrl = "";
            // storage.refFromURL(snap.val().imageUrl).getDownloadURL().then(function(url) {
            //   newImageUrl = url;
            // }).catch(function(error) {
            //   // Handle any errors
            // });

            let item = snap.val();
            item.key = snap.key;
            // item.imageUrl = newImageUrl;

            returnArray.push(item);
          });

          setData(returnArray);
          Util.storeDoctors(returnArray);
          setLoading(false);
        });
      } else {
        // console.log("load from AsyncStorage");
        let doctors = JSON.parse(doctorsFromAS);
        setData(doctors);
        setLoading(false);
      }
      
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  useEffect(() => {
    getDoctors();      
  }, []);

  if(isLoading){
    return( 
      <View style={styles.loader}> 
        <ActivityIndicator size="large" color="firebrick"/>
      </View>
  )};

  /*
 <Button
    title="Add Doctor" 
    onPress={() => {
      navigation.navigate('AddDoctor');
    }}
  />
  */

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>User ID: {user.email}</Text>
      <View style={styles.listcontainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ 
                source: { 
                  uri: item.imageUrl 
                } 
              }}
              title={Util.capitalize(item.name.first) +" "+ Util.capitalize(item.name.last)}
              subtitle={item.jobTitle}
              bottomDivider
              chevron
              onPress={() => {
                navigation.navigate('IndividualDoctor', {
                  userData: item
                });
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

export default Doctors;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },  
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  welcomeText: {
  },
  
  debugBox: {
    borderColor: 'pink',
    borderWidth: 1
  },
  debugText: {
    color: 'lightgray',
    fontStyle: 'italic',
    fontSize: 12
  }
});