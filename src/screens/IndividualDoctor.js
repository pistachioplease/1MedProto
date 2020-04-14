import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  ThemeProvider,
  Button,
  Input,
  Avatar,
  ListItem
} from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Util from '../library/Util';
import Calendly from './Calendly';

const IndividualDoctor = props => {
  const navigation = useNavigation();
  const route = useRoute();

  const {userData}= route.params; 
  const userName = Util.capitalize(userData.name.first) +" "+ Util.capitalize(userData.name.last);

  return (
    <View style={[individualdoctorstyle.container]}>
      <ListItem
        title={userName}
        titleStyle={{ fontWeight: 'bold', fontSize: 24 }}
        subtitle={
          <View style={individualdoctorstyle.subtitleView}>
            <Text style={individualdoctorstyle.jobTitle}>{userData.jobTitle}</Text>
            <Text style={individualdoctorstyle.description}>{userData.subTitle}</Text>
            <Text style={individualdoctorstyle.number}>Emergency Number: {userData.phone}</Text>
          </View>
        }
        leftAvatar={{ source: { uri: userData.imageUrl}, size: "large" }}
      />
      <Calendly />
      
    </View>
  );
}

export default IndividualDoctor;

const individualdoctorstyle = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,
  },
  subtitleView: {
    marginBottom: 20,
  },
  jobTitle: {
    color: 'slategray',
    fontStyle: 'italic',
    fontSize: 18,
  },
  description: {
    color: 'slategray',
    fontSize: 10,
    marginBottom: 5
  },
  number: {
    color: 'firebrick',
    fontWeight: 'bold',
  },
  buttons: {
    marginBottom: 10,
  }
});