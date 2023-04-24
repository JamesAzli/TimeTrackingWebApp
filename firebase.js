import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
 import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCzUvKtGTSyVJRDDX6tJkwaC78ccQEq-F8",
  authDomain: "time-tracking-web-app-e1eee.firebaseapp.com",
  projectId: "time-tracking-web-app-e1eee",
  storageBucket: "time-tracking-web-app-e1eee.appspot.com",
  messagingSenderId: "656226707346",
  appId: "1:656226707346:web:fc6344bca9ec112b7c034b",
  measurementId: "G-WEPBM430ZT"
};

// // // Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(); 
export {auth,provider,db};

// const {
//   initializeApp,
//   applicationDefault,
//   cert,
// } = require("firebase-admin/app");
// const {
//   getFirestore,
//   Timestamp,
//   FieldValue,
// } = require("firebase-admin/firestore");

// const serviceAccount = require("./sdk.json");

// initializeApp({
//   credential: cert(serviceAccount),
// });

// const db = getFirestore();

// // const {
// //   getFirestore,
// //   Timestamp,
// //   FieldValue,
// // } = require("firebase-admin/firestore");




// const {
//   initializeApp,
//   applicationDefault,
//   cert,
// } = require("firebase-admin/app");

// const {
//   getFirestore,
//   Timestamp,
//   FieldValue,
// } = require("firebase-admin/firestore");

// const serviceAccount = require("./sdk.json");

// initializeApp({
//   credential: cert(serviceAccount),
// });

// const db = getFirestore();

// module.exports = {
//   db,
//   Timestamp,
//   FieldValue
// };