import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
 import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBHP_Jbu5Gh7VegXT55sVihr89GsGtZQ_A",
  authDomain: "time-tracking-web-app-v2.firebaseapp.com",
  databaseURL: "https://time-tracking-web-app-v2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "time-tracking-web-app-v2",
  storageBucket: "time-tracking-web-app-v2.appspot.com",
  messagingSenderId: "537794490465",
  appId: "1:537794490465:web:61170f768477d70ce53a20"
};

// // // Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(); 
export {auth,provider,db};
