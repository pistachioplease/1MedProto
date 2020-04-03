import React, { Component } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const Calendly = props => {
  const navigation = useNavigation();
  const route = useRoute();

  return (   
     <WebView source={{ uri: 'https://calendly.com/catestcsgo' }}  />
  );
}

export default Calendly;