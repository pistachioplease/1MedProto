import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Doctors from '../screens/Doctors';
import Chats from '../screens/Chats';
import Appointments from '../screens/Appointments';
import AddSubscription from '../screens/AddSubscription';
import SubscriptionList from '../screens/SubscriptionList';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Doctors"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        style: { backgroundColor: 'dimgray' }
      }}
    >
      <Tab.Screen
        name="Doctors"
        component={Doctors}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: 'dimgray',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          tabBarLabel: 'Appointments',
          tabBarColor: 'dimgray',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SubscriptionList"
        component={SubscriptionList}
        options={{
          tabBarLabel: 'Premium',
          tabBarColor: 'dimgray',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="star-circle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: 'Chat',
          tabBarColor: 'dimgray',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}