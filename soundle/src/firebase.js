import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCEwSnQMGiAPtYHEj68xySsPIRkT7VQZKs",
  authDomain: "soundle-a6f87.firebaseapp.com",
  projectId: "soundle-a6f87",
  storageBucket: "soundle-a6f87.appspot.com",
  messagingSenderId: "84599673796",
  appId: "1:84599673796:web:e38fc8929aca36075fca91",
  measurementId: "G-PG2L8Z6DK6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();

export default database;
