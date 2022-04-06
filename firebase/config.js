//import * as firebase from "firebase";
import firebase from 'firebase/app';
//import 'firebase/ivent-az-36a1d';


import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCEmkZqYLU75AzL0iJiFcwPEhIzyPj225A",
    authDomain: "ivent-az-36a1d.firebaseapp.com",
    databaseURL: "https://ivent-az-36a1d-default-rtdb.firebaseio.com",
    projectId: "ivent-az-36a1d",
    storageBucket: "ivent-az-36a1d.appspot.com",
    messagingSenderId: "825965368811",
    appId: "1:825965368811:web:15924d226779599831b5ae",
    measurementId: "G-JPKC89C2R2"
};

export default firebase.initializeApp(firebaseConfig);
