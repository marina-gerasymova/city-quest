const functions = require("firebase-functions");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadString } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyD3LSsh8N9u2hzjrccwCchVVjPyvnJe0Ag",
  authDomain: "city-quest-3eab4.firebaseapp.com",
  databaseURL: "https://city-quest-3eab4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "city-quest-3eab4",
  storageBucket: "city-quest-3eab4.appspot.com",
  messagingSenderId: "808915159407",
  appId: "1:808915159407:web:ca51080a9a2129f2a7009a",
  measurementId: "G-T3SKGDYVDZ"
};

const firebaseApp = initializeApp(firebaseConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase, deployed with GH Actions!");
});

exports.getTaskImageUrl = functions.https.onCall((data) => {
  const { questId, taskId } = data;

  const storage = getStorage(firebaseApp);
  const storageRef = ref(storage, `${questId}/${taskId}/img.jpg`);
  let imageUrl = null;

  return getDownloadURL(storageRef)
    .then((url) => {
      imageUrl = url;

      return {
        imageUrl
      };
    });
});

exports.uploadTaskImage = functions.https.onCall((data) => {
  const { questId, taskId, dataUrl } = data;

  const storage = getStorage(firebaseApp);
  const storageRef = ref(storage, `${questId}/${taskId}/img.jpg`);

  return uploadString(storageRef, dataUrl, "data_url").then(() => {
    console.log("Uploaded a data_url string!");
  });
});
