import React, {useState, useContext, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  AsyncStorage
} from 'react-native';
import { 
  ListItem,
  Icon
} from 'react-native-elements';
import * as firebase from 'firebase';
import { AuthContext } from '../navigation/AuthContext';
import { Linking } from 'expo';

const Appointments = props => {
  const user = useContext(AuthContext);
  const database = firebase.database();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  async function getAppointments() {
    let ref = database.ref("Appointments");
    ref.orderByChild("InviteeEmail").equalTo(user.email).on('value', snapshot => {
      let returnArray = [];

      snapshot.forEach(function(snap) {
        let item = snap.val();
        item.key = snap.key;

        returnArray.push(item);
      });

      // sort array by start date of event
      returnArray.sort(function(a, b) {
          var dateA = new Date(a.EventStartTime), dateB = new Date(b.EventStartTime);
          return dateA - dateB;
      });

      setData(returnArray);
      setLoading(false);
    });
  }

  useEffect(() => {
    getAppointments();      
  }, []);

  if(isLoading){
    return( 
      <View style={styles.loader}> 
        <ActivityIndicator size="large" color="firebrick"/>
      </View>
  )};

  //<Anchor style={styles.anchor} href="zoomus://">Launch Zoom</Anchor>
  return (
    <View style={styles.container}>
      <View style={styles.helpbox}>
        <Icon raised size={11} name='angle-right' type='font-awesome' color='black' /><Text style={styles.helptext}>Tap on listing to launch appointment</Text>
      </View>
      <View style={styles.listcontainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              title={item.EventTypeName +" ("+ item.EventAssignedTo +") "}
              subtitle={item.EventStartTimePretty}
              bottomDivider
              rightIcon={{ name: 'angle-right', type: 'font-awesome', style: { marginRight: 10, fontSize: 24 } }}
              onPress={() => Linking.openURL(item.EventLocation)}
            />
          )}
        />
      </View>
    </View>
  );
}

export default Appointments;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  helpbox: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch', 
    backgroundColor: 'gainsboro',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  helptext: {
    color: 'slategray',
    fontStyle: 'italic',
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  listcontainer: {
    flex: 13,
    width: "100%",
    flexDirection: 'column',
    marginTop: 10,
    justifyContent: 'flex-start'
  },
  anchor: {
    backgroundColor: 'firebrick',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    marginTop: 10
  }
});