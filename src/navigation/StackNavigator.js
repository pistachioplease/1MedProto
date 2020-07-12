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
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import BottomTabs from './BottomTabs';
import Doctors from '../screens/Doctors';
import IndividualDoctor from '../screens/IndividualDoctor';
import AddDoctor from '../screens/AddDoctor';
import Chats from '../screens/Chats';
import AddSubscription from '../screens/AddSubscription';
import Subscription from '../screens/Subscription';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const navigation = useNavigation();
  
  function MenuButton() {
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

  function SubscriptionButton() {
    return (
      <View>
        <TouchableOpacity
            style={{ marginRight: 10, color: "white" }}
          >
             <MaterialCommunityIcons name="star-circle" size={26} color="white" />
          </TouchableOpacity>
      </View>
    )
  };

  return (
    <Stack.Navigator 
      initialRouteName="Subscription" 
      headerMode="screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'firebrick',
        },
        headerTintColor: '#fff',
        headerLeft: MenuButton,
        headerRight: SubscriptionButton,
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
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="AddSubscription" component={AddSubscription} />
      <Stack.Screen 
        name="Subscription" 
        component={Subscription} 
        options={{ headerTitle: '' }}
        />
    </Stack.Navigator>
  )
};

export default StackNavigator;