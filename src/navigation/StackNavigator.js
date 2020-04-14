import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
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
import BottomTabs from './BottomTabs';
import Doctors from '../screens/Doctors';
import IndividualDoctor from '../screens/IndividualDoctor';
import AddDoctor from '../screens/AddDoctor';

const Stack = createStackNavigator();


export default function StackNavigator() {
  const navigation = useNavigation();
  
  function MenuButton() {
    return (
      <View>
        <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <Avatar rounded title="MD" />
          </TouchableOpacity>
      </View>
    )
  };

  

  return (
    <Stack.Navigator 
      initialRouteName="Tabs" 
      headerMode="screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'firebrick',
        },
        headerTitleStyle: {
          marginLeft: -10,
        },
        headerTintColor: '#fff',
        headerLeft: MenuButton,
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={({ route }) => {
          console.log('!@# options', { route });
          const routeName = route.state
            ? '' 
            : 'Doctors Available';
          // route.state.routes[route.state.index].name
          return { headerTitle: routeName };
        }}
      />
      <Stack.Screen 
        name="Doctors" 
        component={Doctors} 
        options={{ headerTitle: 'Doctors Available' }}
      />
      <Stack.Screen 
        name="IndividualDoctor" 
        component={IndividualDoctor} 
        />
      <Stack.Screen name="AddDoctor" component={AddDoctor} />
    </Stack.Navigator>
  )
};