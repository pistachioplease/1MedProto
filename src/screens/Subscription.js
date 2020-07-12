import React, { Component, useState, useContext } from 'react';
import { 
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Text
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
    <SafeAreaView style={styles.flexContainer}>
      <WebView 
        startInLoadingState={true}
        source={{ uri: 'https://app.1med.ca/payment/?email=' + user.email }}
        renderLoading={() => {
          return loadingIndicator();
        }}
      />
      <View style={styles.tabBarContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Tabs")}>
          <Text style={{ color: "white" }}>Exit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: "dimgray",
    height: 56,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});