import firebase from 'firebase';

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

const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;