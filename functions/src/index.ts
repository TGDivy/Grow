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

    const data = {
      message: {
        token: "",
        notification: {
          title: "Timer Completed",
          body: "Well Done!",
        },
        webpush: {
          headers: {
            Urgency: "high",
          },
          notification: {
            icon: "https://firebasestorage.googleapis.com/v0/b/focus-2ad73.appspot.com/o/logo192.png?alt=media&token=117f4b3a-78c9-47f6-b818-a7ac92192fa8",
            bage: "https://firebasestorage.googleapis.com/v0/b/focus-2ad73.appspot.com/o/hourglass%20(1).png?alt=media&token=b15d92ea-3377-4b4a-b383-a39259fe3f5c",
            click_action: "https://grow.divyb.xyz/Seed",

            fcmOptions: {
              link: "https://grow.divyb.xyz/Seed",
            },
          },
        },
      },
    };

    // send notification to each device and collect the promises, then await them
    const promises = devices?.map((device) => {
      const token = device.pushToken;
      data.message.token = token;

      return admin.messaging().send(data.message);
    });

    Promise.allSettled(promises)
      .then((results) => {
        results.forEach((result, i) => {
          const token = devices?.[i].pushToken;
          if (result.status === "rejected") {
            failedTokens.push(token);
          }
        });
        console.log(
          "promise all settled",
          "results of failed tokens",
          failedTokens.length
        );
      })
      .then(() => {
        console.log("Failure tokens: " + failedTokens);
        if (failedTokens.length > 0) {
          const updatedDevices = devices?.filter((device) => {
            return !failedTokens.includes(device.pushToken);
          });

          console.log("Length of updated devices:", updatedDevices?.length);

          admin
            .firestore()
            .collection("users")
            .doc(userId)
            .update({
              devices: updatedDevices,
            })
            .then(() => {
              response.status(200).send("Devices updated");
            })
            .catch((err) => {
              response.status(500).send("Error updating devices");
            });
        } else {
          console.log("No failed tokens");
        }
      });

    console.log("Notification sent end");

    response.status(200).send("Notifications sent");
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
