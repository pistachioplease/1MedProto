import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Doctors from '../screens/Doctors';
import Chats from '../screens/Chats';
import Appointments from '../screens/Appointments';
import AddSubscription from '../screens/AddSubscription';

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
        name="Subscription"
        component={AddSubscription}
        options={{
          tabBarLabel: 'Subscription',
          tabBarColor: 'dimgray',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="credit-card" color={color} size={26} />
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