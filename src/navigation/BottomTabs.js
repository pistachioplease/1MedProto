import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Doctors from '../screens/Doctors';
import IndividualDoctor from '../screens/IndividualDoctor';

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
        name="IndividualDoctor"
        component={IndividualDoctor}
        headerTitle='Doctors Available'
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