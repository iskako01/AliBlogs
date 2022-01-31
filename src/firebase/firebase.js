import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQNVI8n3ouDVViaFPmx7BYOpbTLrSm8hI",
  authDomain: "aliblog-90d55.firebaseapp.com",
  projectId: "aliblog-90d55",
  storageBucket: "aliblog-90d55.appspot.com",
  messagingSenderId: "121310132995",
  appId: "1:121310132995:web:c099b3964cec5c2ab10736",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const timeestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timeestamp };
export default firebaseApp.firestore;
