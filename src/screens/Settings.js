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

const Settings = props => {
  const user = useContext(AuthContext); 
  const database = firebase.database();
  const storage = firebase.storage();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [debugText, setDebugText] = useState([]);
  const list = [
    {
      name: 'Account',
      icon: 'user-o'
    },
    {
      name: 'Change Subscription',
      icon: 'exchange'
    },
    {
      name: 'Cancel Subscription',
      icon: 'close'
    },
    {
      name: 'Logout',
      icon: 'sign-out',
      onpress: () => Util.handleSignOut()
    },
  ]

  function signOut() {
     Util.handleSignOut();
  }

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <ListItem
      title={item.name}
      leftIcon={{ name: item.icon, type: 'font-awesome', color: 'mistyrose' }}
      onPress={item.onpress}
      bottomDivider
      chevron
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Email: {user.email}</Text>
      <View style={styles.listcontainer}>
        <FlatList
          keyExtractor={keyExtractor}
          data={list}
          renderItem={renderItem}
          />
      </View>
    </View>
  );
}

export default Settings;

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