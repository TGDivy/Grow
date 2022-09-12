// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUR5Fac0kfIoqucdcCz8O5jjEFtGP1aLU",
  authDomain: "focus-2ad73.firebaseapp.com",
  projectId: "focus-2ad73",
  storageBucket: "focus-2ad73.appspot.com",
  messagingSenderId: "975488037850",
  appId: "1:975488037850:web:4ffab7796526cab7fe06e3",
  measurementId: "G-F4QLN44JLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
