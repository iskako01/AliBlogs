import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/compat/functions";

firebase.initializeApp({
  apiKey: "AIzaSyAQNVI8n3ouDVViaFPmx7BYOpbTLrSm8hI",
  authDomain: "aliblog-90d55.firebaseapp.com",
  projectId: "aliblog-90d55",
  storageBucket: "aliblog-90d55.appspot.com",
  messagingSenderId: "121310132995",
  appId: "1:121310132995:web:c099b3964cec5c2ab10736",
});
const auth = firebase.auth();
const db = firebase.firestore();
const database = firebase.database();
const storage = firebase.storage();
const functions = firebase.functions();
export { auth, db, database, storage, functions };
