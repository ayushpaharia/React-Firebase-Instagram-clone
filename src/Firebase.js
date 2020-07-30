import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCdtXMBtJKf2zbQrIr5wcR88CUlF_a_Zlg",
  authDomain: "instagram-react-493be.firebaseapp.com",
  databaseURL: "https://instagram-react-493be.firebaseio.com",
  projectId: "instagram-react-493be",
  storageBucket: "instagram-react-493be.appspot.com",
  messagingSenderId: "25675155964",
  appId: "1:25675155964:web:90bb382162bd9c2aa50a79",
  measurementId: "G-2G1QJ6J4L3",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
