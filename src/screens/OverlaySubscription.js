import React, { Component, useEffect, useState, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
} from 'react-native';
import { 
  Overlay,
  Button
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import Util from '../library/Util';
import { AuthContext } from '../navigation/AuthContext';

const OverlaySubscription = props => {
  const user = useContext(AuthContext); 
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // get if subscribed
  useEffect(() => { 
    console.log("[useEffect()]");
    fetch('https://app.1med.ca/subscriptions', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => (result == "active") ? setModalVisible(false) : setModalVisible(true))      
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <Overlay 
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      style={styles.overlay}
      windowBackgroundColor="rgba(178, 34, 34, .2)"
      >
      <View style={styles.closeButtonView}>
        <Button
          style={styles.closeButton}
          icon={{
            name: "close", 
            type: 'font-awesome', 
            color: 'firebrick'
          }}
          title=""
          type="clear"
          buttonStyle={{
            backgroundColor: 'white',
          }}
          onPress={() => setModalVisible(false)}
        />
      </View>
      <View style={styles.centeredView}>
        <Text style={styles.modalText}>User with email: {user.email} doesn't have an active subscription.</Text>
        <View style={styles.subscribeButton}>
          <Button
            icon={{
              name: "credit-card", 
              type: 'font-awesome', 
              color: 'mistyrose'
            }}
            title=" Subscribe"
            onPress={() => { setModalVisible(false); navigation.navigate("Subscription"); }}
          />
        </View>
      </View>
    </Overlay>      
  );
}

export default OverlaySubscription;

const styles = StyleSheet.create({
  overlay: {
    flex: 1
  },
  centeredView: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'dimgray',
    fontSize: 16,
  },
  closeButtonView: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  subscribeButton: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});