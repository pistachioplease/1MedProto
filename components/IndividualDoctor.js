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
import Util from './../library/Util';
import Calendly from './Calendly';

const IndividualDoctor = props => {
  const navigation = useNavigation();
  const route = useRoute();

  const {userData}= route.params; 
  const userName = Util.capitalize(userData.name.first) +" "+ Util.capitalize(userData.name.last);
  const list = [
    {
      title: 'QUICK CONSULTATION',
      subtitle: 'We will call you at a set time!',
      colors: ['darkorange', 'orange']
    },
    {
      title: 'CONSULTATION',
      subtitle: 'Virtual Meeting with your physician (30 min)',
      colors: ['lightcoral', 'crimson']
    },
    {
      title: 'EXTEND CONSULTATION',
      subtitle: 'Virtual Meeting with your physician (60 min)',
      colors: ['darkgreen', 'green']
    },
    {
      title: 'MEET & GREET',
      subtitle: 'Introductory Meeting with your physician',
      colors: ['deepskyblue', 'dodgerblue']
    },
  ];

  return (
    <SafeAreaView style={[individualdoctorstyle.container]}>
      <ListItem
        title={userName}
        titleStyle={{ fontWeight: 'bold', fontSize: 24 }}
        subtitle={
          <View style={individualdoctorstyle.subtitleView}>
            <Text style={individualdoctorstyle.jobTitle}>{Util.randomJobTitles()}</Text>
            <Text style={individualdoctorstyle.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</Text>
            <Text style={individualdoctorstyle.number}>Emergency Number: {userData.phone}</Text>
          </View>
        }
        leftAvatar={{ source: { uri: userData.picture.large }, size: "large" }}
      />
      <Calendly />
      
    </SafeAreaView>
  );
}

export default IndividualDoctor;

const individualdoctorstyle = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,
    margin: 10,
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

// <View>
//         {
//           list.map((item, i) => (
//             <ListItem style={individualdoctorstyle.buttons}
//               key={i}
//               title={item.title}
//               subtitle={item.subtitle}
//               titleStyle={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}
//               subtitleStyle={{ textAlign: 'center', color: 'white', fontSize: 12, fontStyle: 'italic' }}
//               linearGradientProps={{
//                 colors: item.colors,
//                 start: [1, 0],
//                 end: [0.2, 0],
//               }}
//               bottomDivider
//               chevron
//             />
//           ))
//         }
//       </View>