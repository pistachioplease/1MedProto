import React, { Component, useState, useContext } from 'react';
import { 
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { AuthContext } from '../navigation/AuthContext';

const Subscription = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useContext(AuthContext); 

  function loadingIndicator() {
    return (
      <View style={styles.loader}> 
        <ActivityIndicator size="large" color="firebrick"/>
      </View>
    );
  }

  return (   
    <WebView 
      startInLoadingState={true}
      source={{ uri: 'https://app.1med.ca/payment/?email=' + user.email }}
      renderLoading={loadingIndicator}
    />
    <View style={styles.tabBarContainer}>
      <TouchableOpacity onPress={() => props.navigation.navigate("Doctors")}>
        <Text style={{ color: "green" }}>Exit</Text>
      </TouchableOpacity>
    </View>
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
  tabBarContainer: {
    backgroundColor: "#d3d3d3",
    height: 56,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
});