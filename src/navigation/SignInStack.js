import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Doctors from '../screens/Doctors';
import IndividualDoctor from '../screens/IndividualDoctor';
import AddDoctor from '../screens/AddDoctor';
import DrawerContent from '../screens/Drawer';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

export default function SignInStack() {
  return (
    <Drawer.Navigator drawerContent={DrawerContent}>
      <Drawer.Screen name="Home" component={StackNavigator} />
    </Drawer.Navigator>
  )
};