import React, { useState, useEffect, createContext } from 'react';
import Splash from '../screens/Splash';
import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';
import * as firebase from 'firebase';

//Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCQWfZuzO8mPt-_kuNVK6Y2jqncwcPicg4",
  authDomain: "authflow-b1864.firebaseapp.com",
  databaseURL: "https://authflow-b1864.firebaseio.com/",
  projectId: "authflow-b1864",
  storageBucket: "authflow-b1864.appspot.com",
  messagingSenderId: "219133059115",
  appId: "1:219133059115:web:f71d77c4486a194679ca6e",
  measurementId: "G-EZNWHB2YP8"
};

firebase.initializeApp(firebaseConfig);

export const AuthContext = createContext (null);

export default function AuthNavigator() {
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
