import React, { Component, useState, useContext } from 'react';
import { 
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { AuthContext } from '../navigation/AuthContext';

function loading() {
  return (
    <View style={styles.loader}> 
      <ActivityIndicator size="large" color="firebrick"/>
    </View>
  );
}
const Subscription = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useContext(AuthContext); 

  return (   
    <WebView 
      startInLoadingState={true}
      source={{ uri: 'https://app.1med.ca/payment/' }}
      renderLoading={() => {
        return loading();
      }}
    />
  );

}

export default Subscription;

const styles = StyleSheet.create({
  loader:{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});