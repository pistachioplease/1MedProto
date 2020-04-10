import React, { Component, useEffect, useState, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
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
import { AuthContext } from '../navigation/AuthNavigator';

const Doctors = props => {
  const database = firebase.database();
  const storage = firebase.storage();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [debugText, setDebugText] = useState([]);

  const user = useContext(AuthContext);

  handleSignOut = () => {
    firebase.auth().signOut().then(() => console.log("logout")).catch(error => console.log(error));
  };

  useEffect(() => {
    var ref = database.ref("Doctors");
    ref.on('value', snapshot => {
      var returnArray = [];

      snapshot.forEach(function(snap) {
        let newImageUrl = "";
        // storage.refFromURL(snap.val().imageUrl).getDownloadURL().then(function(url) {
        //   newImageUrl = url;
        // }).catch(function(error) {
        //   // Handle any errors
        // });

        var item = snap.val();
        item.key = snap.key;
        // item.imageUrl = newImageUrl;

        returnArray.push(item);
      });

      setData(returnArray);
      // setDebugText(returnArray);
      setLoading(false);
    });
      
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>User ID: {user.email}</Text>
      <Text style={styles.screentitle}>Doctors Available</Text>
    
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
      <Button title="Sign Out" onPress={handleSignOut} />
    </SafeAreaView>
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
    marginTop: 10
  },
  screentitle: {
    color: 'slategray',
    fontSize: 18,
    textAlign: 'center',    
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