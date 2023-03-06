/* eslint-disable max-len */
import functions = require("firebase-functions");
import admin = require("firebase-admin");
import { CloudTasksClient } from "@google-cloud/tasks";
import { google } from "@google-cloud/tasks/build/protos/protos";

admin.initializeApp();

// function when timers/{userId} is created or updated
// this function will create a task in the queue
export const onUpdateTimer = functions
  .region("europe-west1")
  .firestore.document("timers/{userId}")
  .onUpdate(async (change, context) => {
    const data = change.after.data();
    // const previousData = change.before.data();
    const userId = context.params.userId;

    const { active, timerDuration, startTime } = data;

    if (active) {
      const expiresAtSeconds = startTime.seconds + timerDuration;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const project = JSON.parse(process.env.FIREBASE_CONFIG!).projectId;
      const location = "europe-west1";
      const queue = "timer-notification";

      const client = new CloudTasksClient();

      const queuePath = client.queuePath(project, location, queue);

      const url = `https://${location}-${project}.cloudfunctions.net/timerNotification`;
      const payload = { userId };

      const task = {
        httpRequest: {
          httpMethod: google.cloud.tasks.v2.HttpMethod.POST,
          url,
          headers: {
            "Content-Type": "application/json",
          },
          body: Buffer.from(JSON.stringify(payload)).toString("base64"),
        },
        scheduleTime: {
          seconds: expiresAtSeconds as number,
        },
      };

      const [response] = await client.createTask({ parent: queuePath, task });

      // also add a field to users/{userId} called queuePath which will be used to delete the task from the queue
      await admin.firestore().collection("users").doc(userId).update({
        queTaskPath: response.name,
      });
    } else {
      // if timer is not active, delete task from queue

      const userDoc = await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .get();

      const user = userDoc.data();
      const taskPath = user?.queTaskPath;

      const client = new CloudTasksClient();
      const request = {
        name: taskPath,
      };

      // try to delete task from queue
      try {
        await client.deleteTask(request);
      } catch (error) {
        // if task is not found, it means it has already been deleted
        console.log("Error deleting task:", error);
      }

      // remove queueTaskPath from users/{userId}
      await admin.firestore().collection("users").doc(userId).update({
        queTaskPath: admin.firestore.FieldValue.delete(),
      });
    }
  });

interface deviceType {
  device: string;
  pushToken: string;
}

// function to send notification to user when timer expires
export const timerNotification = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    const { userId } = request.body;

    // get devices from users/{userId} which contains push notification tokens
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();
    const user = userDoc.data();
    const devices = user?.devices as deviceType[];

    const failedTokens: string[] = [];

    // send notification to each device
    devices?.forEach(async (device) => {
      const token = device.pushToken;
      const data = {
        message: {
          token: token,
          notification: {
            title: "Timer Completed",
            body: "Well Done!",
          },
          webpush: {
            headers: {
              Urgency: "high",
            },
            notification: {
              icon: "https://firebasestorage.googleapis.com/v0/b/focus-2ad73.appspot.com/o/hourglass%20(1).png?alt=media&token=b15d92ea-3377-4b4a-b383-a39259fe3f5c",
              fcmOptions: {
                link: "https://grow.divyb.xyz/Seed",
              },
            },
          },
        },
      };

      // if notification fails, remove device from users/{userId}
      try {
        const response = await admin.messaging().send(data.message);
        console.log("Successfully sent message:", response);
      } catch (error) {
        console.log("Error sending message:", error);
        failedTokens.push(token);
      }
    });

    // remove failed tokens from users/{userId}
    if (failedTokens.length > 0) {
      const updatedDevices = devices?.filter((device) => {
        return !failedTokens.includes(device.pushToken);
      });

      await admin.firestore().collection("users").doc(userId).update({
        devices: updatedDevices,
      });
    }

    response.send("Notification sent");
  });

// data is organised as users/{userId}
// delete all users/{userId} which don't have an email address every 30 days = 30*24 = 720 hours
// also delete all users/{userId} that don't have a subcollection called plow or sow or journal
export const deleteUsers = functions
  .region("europe-west1")
  .pubsub.schedule("every 720 hours")
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
