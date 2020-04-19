import React, { useState, useEffect, createContext } from 'react';
import Splash from '../screens/Splash';
import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';
import { AuthContext } from './AuthContext';
import * as firebase from 'firebase';
import Firebase from '../library/Firebase';

// firebase.auth().signOut().then(() => console.log("logout")).catch(error => console.log(error));

const AuthNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);  

  // Handle user state changes
  function onAuthStateChanged(result) {
    setUser(result);

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  if (initializing) {
    return <Splash />;
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <SignInStack />
    </AuthContext.Provider>
  ) : (
    <SignOutStack />
  );
};

export default AuthNavigator;
