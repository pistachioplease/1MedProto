import React, { useState, useContext, useEffect } from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { 
  Avatar,
  Text,
  Icon,
} from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import BottomTabs from './BottomTabs';
import Doctors from '../screens/Doctors';
import IndividualDoctor from '../screens/IndividualDoctor';
import AddDoctor from '../screens/AddDoctor';
import Chats from '../screens/Chats';
import AddSubscription from '../screens/AddSubscription';
import Subscription from '../screens/Subscription';
import { AuthContext } from '../navigation/AuthContext';
import Util from '../library/Util';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [subscriptionState, setSubscriptionState] = useState("inactive");
  const user = useContext(AuthContext); 

  // fetch subscription info from firebase  
  useEffect(() => {
    fetch('https://app.1med.ca/subscriptions', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        (result == "active") ? setSubscriptionState("active") :setSubscriptionState("inactive");
        console.log(result);
      })      
      .catch((error) => {
        console.log(error);
      })
  }, []);

  function BackButton() {
    return (
      <View>
        <TouchableOpacity
            style={{ marginLeft: 10, color: "white" }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialCommunityIcons name="chevron-left" size={32} color="white" />
          </TouchableOpacity>
      </View>
    )      
  };

  return (
    <Stack.Navigator 
      initialRouteName= {() => { return subscriptionState == "active" ? "Tabs" : "Subscription" }}
      headerMode="screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'firebrick',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerLeft: BackButton,
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={({ route }) => {
          // console.log('!@# options', { route });          
          const routeName = route.state ? route.state.routeNames[route.state.index] : route.params?.screen || 'Doctors';
          // route.state.routes[route.state.index].name

          return { headerTitle: routeName };
        }}
      />
      <Stack.Screen 
        name="Doctors" 
        component={Doctors} 
        options={{ title: 'Doctors Available', headerLeft: null }}
      />
      <Stack.Screen 
        name="IndividualDoctor" 
        component={IndividualDoctor} 
        />
      <Stack.Screen name="AddDoctor" component={AddDoctor} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="AddSubscription" component={AddSubscription} />
      <Stack.Screen 
        name="Subscription" 
        component={Subscription} 
        options={{
          headerShown: false,
          header: null,
        }}
        />
    </Stack.Navigator>
  )
};

export default StackNavigator;