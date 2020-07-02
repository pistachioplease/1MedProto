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
import AddSubscription from '../screens/AddSubscription';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const SubscriptionList = props => {
  const user = useContext(AuthContext); 
  const database = firebase.database();
  const storage = firebase.storage();
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
   fetch('http://1med.pistachioplease.com/products.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    })
    .catch((error) => console.error(error))
    .finally(() => {
      setLoading(false);
    });
  }, []);
  

  const [debugText, setDebugText] = useState([]);

  function handleSignOut() {
    firebase.auth().signOut().then(() => console.log("logout")).catch(error => console.log(error));
  };

  if(isLoading){
    return( 
      <View style={styles.loader}> 
        <ActivityIndicator size="large" color="firebrick"/>
      </View>
  )};

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Choose the plan that suits you.</Text>
      <View style={styles.listcontainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              title={item.nickname}
              subtitle={item.currency.toUpperCase() + " " + numberWithCommas((Math.round(item.unit_amount) / 100).toFixed(2)) + " / " + item.recurring.interval}
              bottomDivider
              chevron
              onPress={() => {
                navigation.navigate('AddSubscription', {planId: item.id, productId: item.product})}}
            />
          )}
        />     
      </View>
    </View>
  );
}

export default SubscriptionList;

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