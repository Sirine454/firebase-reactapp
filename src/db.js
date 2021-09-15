
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD7ARPWaDeuv7ys46Mxx6v4sfh4K1hh5-I",
  authDomain: "newspaper-app-5b075.firebaseapp.com",
  databaseURL: "https://newspaper-app-5b075-default-rtdb.firebaseio.com",
  projectId: "newspaper-app-5b075",
  storageBucket: "newspaper-app-5b075.appspot.com",
  messagingSenderId: "297209273292",
  appId: "1:297209273292:web:7b496bb6005b232f04db69",
  measurementId: "G-107HDGWBBH"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  export { projectStorage, projectFirestore,database};
  