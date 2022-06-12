const functions = require("firebase-functions");
const { initializeApp } = require("firebase/app");
const Storage = require("firebase/storage");
const Database = require("firebase/database");

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

/**
 * QUESTS CRUD
 */

exports.createQuest = functions.https.onCall((data) => {
  const { questCode, name, teamsNum,
    teamCap, address, time, cost } = data;

    const db = Database.getDatabase();
    return Database.set(Database.ref(db, `quests/${questCode}`), {
      code: questCode,
      name,
      teamsNum,
      teamCap,
      address,
      time,
      cost,
      tasks: [],
      teams: []
    });
});

exports.readQuest = functions.https.onCall((data) => {
  const { questCode } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  return Database.get(Database.child(dbRef, `quests/${questCode}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return {
        quest: snapshot.val()
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
});

exports.readUserQuests = functions.https.onCall((data) => {
  const { uid } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  return Database.get(Database.child(dbRef, `users/${uid}/quests`)).then((snapshot) => {
    if (snapshot.exists()) {
      const quests = snapshot.val();
      return {
        quests: quests.filter(quest => {
          return new Date(+quest.time) - Date.now() > 0;
        })
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
});

exports.updateQuest = functions.https.onCall((data) => {
  const { code } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  const updates = {};
  updates[`quests/${code}`] = { ...data };
  
  return Database.update(dbRef, updates);
});

exports.deleteQuest = functions.https.onCall((data) => {
  const { code } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  const updates = {};
  updates[`quests/${code}`] = null;
  
  return Database.update(dbRef, updates);
});

/**
 * TASKS CRUD
 */

exports.createTask = functions.https.onCall((data) => {
  const { questCode, name, task,
    hint, time, imgDataUrl } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);
  const newTaskKey = Database.push(Database.child(dbRef, "tasks")).key;
  const storage = Storage.getStorage(firebaseApp);
  const storageRef = Storage.ref(storage, `${questCode}/${newTaskKey}/img.jpg`);

  return Storage.uploadString(storageRef, imgDataUrl, "data_url")
    .then(() => {
      return Storage.getDownloadURL(storageRef)
    })
    .then((imgUrl) => {
      const taskData = {
        questCode,
        name,
        task,
        hint,
        time,
        imgUrl,
        uid: newTaskKey,
        createdAt: Date.now()
      }

      const updates = {};
      updates[`tasks/${questCode}/${newTaskKey}`] = taskData;
      updates[`quests/${questCode}/tasks/${newTaskKey}`] = taskData.createdAt;

      return Database.update(dbRef, updates);
    });
});

exports.readTask = functions.https.onCall((data) => {
  const { questCode, index } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  return Database.get(Database.child(dbRef, `tasks/${questCode}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const tasks = Object.values(snapshot.val()); // [ { createdAt: '' } ]
      const sortedTasks = tasks.sort((a, b) => a.createdAt - b.createdAt);
      return {
        task: sortedTasks[index]
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
});

exports.readQuestTasks = functions.https.onCall((data) => {
  const { questCode } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  return Database.get(Database.child(dbRef, `tasks/${questCode}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const tasks = Object.values(snapshot.val());
      return {
        tasks
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
});

exports.updateTask = functions.https.onCall((data) => {
  const { uid, questCode } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);
  const storage = Storage.getStorage(firebaseApp);
  const storageRef = Storage.ref(storage, `${questCode}/${uid}/img.jpg`);

  if (data.imgDataUrl) {
    return Storage.uploadString(storageRef, data.imgDataUrl, "data_url")
    .then(() => {
      return Storage.getDownloadURL(storageRef)
    })
    .then((imgUrl) => {
      const updates = {};
      updates[`tasks/${questCode}/${uid}`] = { ...data, imgUrl };

      return Database.update(dbRef, updates);
    });
  }

  const updates = {};
  updates[`tasks/${questCode}/${uid}`] = { ...data };

  return Database.update(dbRef, updates);
});

exports.deleteTask = functions.https.onCall((data) => {
  const { uid, questCode } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  const updates = {};
  updates[`tasks/${questCode}/${uid}`] = null;

  return Database.update(dbRef, updates);
});
