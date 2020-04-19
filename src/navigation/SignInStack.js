import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from '../screens/Drawer';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

const SignInStack = () => {
  return (
    <Drawer.Navigator drawerContent={DrawerContent}>
      <Drawer.Screen name="Home" component={StackNavigator} />
    </Drawer.Navigator>
  )
};

export default SignInStack;