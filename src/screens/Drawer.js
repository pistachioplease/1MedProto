import React, { Component } from 'react';
import { 
  StyleSheet,
  View,
} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { 
  Avatar,
  Text,
  Button
} from 'react-native-elements';
import * as firebase from 'firebase';


function DrawerContent(props) {
  function handleSignOut() {
    firebase.auth().signOut().then(() => console.log("logout")).catch(error => console.log(error));
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar rounded title="MD" />
          <Text h4>Test User</Text>
          <Text style={styles.caption}>angbagongako@gmail.com</Text>
        </View>
        <View style={styles.userInfoSection}>
          <Button title="Sign Out" onPress={handleSignOut} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  userInfoSection: {
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 12,
    fontStyle: 'italic'
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});