import firebase from "firebase/compat/app";
import {getFirestore} from "firebase/firestore/lite";

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

// Use these for db & auth
const db = getFirestore(firebaseApp);
// const auth = firebase.auth();
// const answersCol = collection(db, "answers");
// const answersSnapshot = await getDocs(answersCol);
// const answerList = answersSnapshot.docs.map((doc) => doc.data());
// const List = answerList.then(function (result) {
//   return result;
// });
export {db};
