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
  ListItem
} from 'react-native-elements';
import * as firebase from 'firebase';
import Anchor from '../components/Anchor'; 
import { AuthContext } from '../navigation/AuthContext';

const Appointments = props => {
  const user = useContext(AuthContext);
  const database = firebase.database();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const showAlert = () =>{
    Alert.alert(
      '',
      'This will open zoom app to start the appointment.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

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

        //<Anchor style={styles.anchor} href="lyft://ridetype?id=lyft&pickup[latitude]=37.764728&pickup[longitude]=-122.422999&destination[latitude]=37.7763592&destination[longitude]=-122.4242038">Launch Zoom</Anchor>
  return (
    <View style={styles.container}>
      <View style={styles.listcontainer}>
        <Anchor style={styles.anchor} href="zoomus://">Launch Zoom</Anchor>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              title={item.EventTypeName +" ("+ item.EventAssignedTo +") "}
              subtitle={item.EventStartTimePretty}
              bottomDivider
              chevron
              onPress={showAlert}
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
    alignItems: 'center'
  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  listcontainer: {
    flex: 1,
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