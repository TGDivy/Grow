import { db } from "./firebase-config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const addUser = async (user) => {
  const docRef = doc(db, "users", user.uid);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Add user: User already exists");

    if (docSnap.data()?.guest) {
      console.log("Add user: User is a guest, updating user");

      const userDoc = {
        email: user.email,
        guest: false,
      };

      await updateDoc(docRef, userDoc);

      return { ...docSnap.data(), ...userDoc };
    }

    return docSnap.data();
  } else {
    console.log("Add user: User does not exist");
    const userDoc = {
      uid: user.uid,
      email: user.email,
      guest: user.isAnonymous,
      created: new Date(),
    };

    await setDoc(docRef, userDoc);

    return userDoc;
  }
};

export default addUser;
