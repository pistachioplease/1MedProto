import React, { Component, useState } from 'react';
import { 
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

function loading() {
  return (
    <View style={styles.loader}> 
      <ActivityIndicator size="large" color="firebrick"/>
    </View>
  );
}
const Calendly = props => {
  const navigation = useNavigation();
  const route = useRoute();

  return (   
    <WebView 
      startInLoadingState={true}
      source={{ uri: 'https://calendly.com/1med' }}
      renderLoading={() => {
        return loading();
      }}
    />
  );

}

export default Calendly;

const styles = StyleSheet.create({
  loader:{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});