import { db } from "./../firebase-config";
import { doc, getDoc } from "firebase/firestore";

const getUser = async (user_uid) => {
  const docRef = doc(db, "users", user_uid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export default getUser;
