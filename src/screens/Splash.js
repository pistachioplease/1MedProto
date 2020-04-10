import React from 'react';
import { 
  StyleSheet, 
  View,
  ActivityIndicator,
} from 'react-native';

const Splash = props => {
  return( 
    <View style={styles.loader}> 
      <ActivityIndicator size="large" color="firebrick"/>
    </View>
  )
}

export default Splash;

const styles = StyleSheet.create({
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});