import React, { Component, useEffect, useState } from 'react';
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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Util from './../library/Util';

const counter = 0;

const Doctors = props => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [debugText, setDebugText] = useState([]);

  useEffect(() => {
      fetch('https://randomuser.me/api/?results=20&nat=us,gb,ca', {
        method: 'GET'        
      })
      .then(response => response.json())
      .then((responseJson)=> {
        setData(responseJson.results);
        setDebugText(responseJson.info);
        setLoading(false);
      })
      .catch(error=>console.log(error)) //to catch the errors if any
  }, [counter]);

  if(isLoading){
    return( 
      <View style={styles.loader}> 
        <ActivityIndicator size="large" color="firebrick"/>
      </View>
  )};


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screentitle}>Doctors Available</Text>
      <View style={styles.listcontainer}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <ListItem
              key={index}
              leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              title={Util.capitalize(item.name.first) +" "+ Util.capitalize(item.name.last)}
              subtitle={Util.randomJobTitles()}
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
      <Text style={styles.debugText}>{JSON.stringify(debugText)} {counter}</Text>
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
  screentitle: {
    color: 'slategray',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10
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