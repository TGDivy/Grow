/* eslint-disable max-len */
import functions = require("firebase-functions");
import admin = require("firebase-admin");
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();

// function to send notification to user whenever a new task is created in users/{userId}/plow/{taskId}
export const sendNotification = functions.firestore
  .document("users/{userId}/plow/{taskId}")
  .onCreate(async (snap, context) => {
    const token =
      "dBsPEEH-SVSyMdyK7mAy0_:APA91bE-N3B2dpB9G0vQUtr57DRPSliA4lw0q_BfmoCJL3DI38D3nNCX7hBLDWM6HuZt5mVQXw6QKUy24KNNHVtUqUTABInM5Ujnb0r4OFpvPcTrud-_fZeLfB_2d3Ucqkk0oHELUfNO";

    const snapData = snap.data();
    console.log(snapData);
    const data = {
      message: {
        token: token,
        notification: {
          title: "New Task",
          body: `${snapData?.title}`,
        },
        data: {
          Nick: "Mario",
          Room: "PortugalVSDenmark",
        },
      },
    };

    const response = await admin.messaging().send(data.message);
    console.log("Successfully sent message:", response);
  });

// data is organised as users/{userId}
// delete all users/{userId} which don't have an email address every 30 days = 30*24 = 720 hours
// also delete all users/{userId} that don't have a subcollection called plow or sow or journal
export const deleteUsers = functions.pubsub
  .schedule("every 720 hours")
  .timeZone("Europe/London")
  .onRun(async (context) => {
    const snapshot = await admin.firestore().collection("users").get();
    snapshot.forEach(async (doc) => {
      const data = doc.data();
      if (!data.email) {
        await admin.firestore().collection("users").doc(doc.id).delete();
      }
    });

    const snapshot2 = await admin.firestore().collection("users").get();
    // check for subcollections, i.e. users/{userId}/[plow, sow, journal]
    snapshot2.forEach(async (doc) => {
      const subcollections = await admin
        .firestore()
        .collection("users")
        .doc(doc.id)
        .listCollections();
      if (subcollections.length === 0) {
        await admin.firestore().collection("users").doc(doc.id).delete();
      }
    });
  });
