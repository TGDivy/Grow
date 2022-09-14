import { db } from "./../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const addUser = async (user) => {
  const docRef = doc(db, "users", user.uid);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Add user: User already exists");
    return docSnap.data();
  } else {
    console.log("Add user: User does not exist");
    const userDoc = {
      uid: user.uid,
      email: user.email,
      total_time: 0,
      total_sess: 0,
      fail_sess: 0,
      created: new Date(),
    };

    await setDoc(docRef, userDoc);

    return userDoc;
  }
};

export default addUser;
