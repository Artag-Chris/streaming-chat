import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyA7aHthLvJSfkQKZi0zR3NMBAOyyDsXowo",
  authDomain: "streaming-chat-3aca2.firebaseapp.com",
  projectId: "streaming-chat-3aca2",
  storageBucket: "streaming-chat-3aca2.appspot.com",
  messagingSenderId: "160798176793",
  appId: "1:160798176793:web:8bdae228193093dc411c88",
  measurementId: "G-H83E9LMMF8"
};

// esto nos ayuda a controlar todo el login y la info en la firestore o firebase
const firebaseApp = firebase.initializeApp (firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};