import 'react-native-gesture-handler';
import React from 'react';
import { 
  ThemeProvider
} from 'react-native-elements';
import AuthNavigator from './src/navigation/AuthNavigator'

const theme = {
  colors: {
    primary: 'firebrick'
  },
  Button: {
    raised: false,
    buttonStyle: {
      backgroundColor: 'firebrick',
      borderRadius: 20,
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 10,
      marginTop: 10
    },
  },
  iconContainerStyle: {
    paddingRight: 10,
  },
  ListItem: {

  },  
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
       <AuthNavigator />
    </ThemeProvider>
  );  
};

export default App;
