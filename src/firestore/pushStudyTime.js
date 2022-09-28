import {
  addDoc,
  collection,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import { db } from "./../firebase-config";

const pushStudyTime = async (studyTime, user, tags, notes) => {
  const failedToStudy = studyTime <= 600;
  const docRef = await addDoc(collection(db, "FocusSession"), {
    created: new Date(),
    time: studyTime,
    user_uid: user.uid,
    failed: failedToStudy,
    tags,
    notes,
  });

  const userDocRef = doc(db, "users", user.uid);
  await updateDoc(userDocRef, {
    total_time: increment(studyTime),
    total_sess: increment(1),
    fail_sess: increment(failedToStudy ? 1 : 0),
  });

  console.log("Document written with ID: ", docRef.id);
};

export default pushStudyTime;
