import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Doctors from '../screens/Doctors';
import IndividualDoctor from '../screens/IndividualDoctor';

const Stack = createStackNavigator();

export default function SignInStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Doctors" headerMode='none'>
        <Stack.Screen name="Doctors" component={Doctors} />
        <Stack.Screen name="IndividualDoctor" component={IndividualDoctor} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};