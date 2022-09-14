import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  enableIndexedDbPersistence,
  disableNetwork,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == "failed-precondition") {
    console.log(
      "Multiple tabs open, persistence can only be enabled in one tab at a a time."
    );
  } else if (err.code == "unimplemented") {
    console.log(
      "The current browser does not support all of the features required to enable persistence"
    );
  } else {
    console.log("offline persistance enabled.");
  }
});

disableNetwork(db);
// console.log("Network disabled!");
