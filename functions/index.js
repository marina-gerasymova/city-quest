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
    teamCap, address, time, cost, creatorId } = data;

    const db = Database.getDatabase();
    const dbRef = Database.ref(db);
    const updates = {};
    const questData = {
      code: questCode,
      creatorId,
      name,
      teamsNum,
      teamCap,
      address,
      time,
      cost,
      tasks: [],
      teams: []
    };
    updates[`quests/${questCode}`] = questData;
    updates[`users/${creatorId}/quests/${questCode}`] = questData;
    
    return Database.update(dbRef, updates);
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
      const quests = Object.values(snapshot.val());
      return {
        quests
      };
    }
  }).catch((error) => {
    console.error(error);
  });
});

exports.updateQuest = functions.https.onCall((data) => {
  const { code, uid } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  const updates = {};
  updates[`quests/${code}`] = { ...data };
  updates[`users/${uid}/quests/${code}`] = { ...data };

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
  const { questCode, name, description,
    key, hint, time, imgDataUrl } = data;

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
        description,
        hint,
        key: key.toUpperCase(),
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
  const { questCode, taskUid } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  return Database.get(Database.child(dbRef, `tasks/${questCode}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const tasks = snapshot.val();
      return {
        task: tasks[taskUid]
      }
    }
  }).catch((error) => {
    console.error(error);
  });
});

exports.readAllTasksId = functions.https.onCall((data) => {
  const { questCode } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  return Database.get(Database.child(dbRef, `quests/${questCode}/tasks`)).then((snapshot) => {
    if (snapshot.exists()) {
      const tasks = snapshot.val();
      return {
        tasks
      }
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
      console.log(JSON.stringify(snapshot.val()));
      const tasks = Object.values(snapshot.val());
      return {
        tasks
      }
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

/**
 * TEAMS LOGIC
 */

exports.createTeam = functions.https.onCall((data) => {
  const { userId, questCode, name } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);
  const newTeamKey = Database.push(Database.child(dbRef, "teams")).key;

  const teamData = {
    questCode,
    name,
    uid: newTeamKey,
    currentTask: "",
    players: [ userId ],
    createdAt: Date.now()
  }

  const updates = {};
  updates[`teams/${questCode}/${newTeamKey}`] = teamData;
  updates[`quests/${questCode}/teams/${newTeamKey}`] = teamData.createdAt;

  return Database.update(dbRef, updates);
});

exports.readQuestTeams = functions.https.onCall((data) => {
  const { questCode } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  return Database.get(Database.child(dbRef, `teams/${questCode}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const teams = Object.values(snapshot.val());

      const parsedTeams = teams.map(team => {
        return {
          ...team,
          players: team.players.map(async (playerId) => {
            return await Database.get(Database.child(dbRef, `users/${playerId}`)).then(data => data.val().name);
          })
        };
      });

      return {
        teams: parsedTeams
      };
    }
  }).catch((error) => {
    console.error(error);
  });
});

exports.getTeamInfo = functions.https.onCall((data) => {
  const { teamUid, questCode } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  return Database.get(Database.child(dbRef, `teams/${questCode}/${teamUid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const team = snapshot.val();
        const players = team.players.map(async (playerId) => {
          return await Database.get(Database.child(dbRef, `users/${playerId}`))
            .then((shot) => {
              if (shot.exists()) {
                return {
                  name: shot.val().name
                }
              }
            })
        });
        return {
          ...team,
          players
        };
      }
    }).catch((error) => {
      console.error(error);
    });
});

exports.joinTeam = functions.https.onCall((data) => {
  const { teamUid, questCode, userUid } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  return Database.get(Database.child(dbRef, `teams/${questCode}/${teamUid}/players`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
    })
    .then((playersArray) => {
      playersArray.push(userUid);

      const updates = {};
      updates[`teams/${questCode}/${teamUid}/players`] = playersArray;

      return Database.update(dbRef, updates);
    })
    .catch((error) => {
      console.error(error);
    });
});

exports.leaveTeam = functions.https.onCall((data) => {
  const { teamUid, questCode, userUid } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  return Database.get(Database.child(dbRef, `teams/${questCode}/${teamUid}/players`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
    })
    .then((playersArray) => {
      playersArray.filter(uid => uid !== userUid);

      const updates = {};
      updates[`teams/${questCode}/${teamUid}/players`] = playersArray;

      return Database.update(dbRef, updates);
    })
    .catch((error) => {
      console.error(error);
    });
});

exports.nextTaskTeam = functions.https.onCall((data) => {
  const { questCode, teamUid, nextTaskId } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);
  
  const updates = {};
  updates[`teams/${questCode}/${teamUid}/currentTask`] = nextTaskId;

  return Database.update(dbRef, updates);
});

/**
 * QUEST COMPLETING CALLS
 */

exports.submitTask = functions.https.onCall((data) => {
  const { questCode, taskUid, key } = data;

  const db = Database.getDatabase();
  const dbRef = Database.ref(db);

  return Database.get(Database.child(dbRef, `tasks/${questCode}/${taskUid}/key`)).then((snapshot) => {
    if (snapshot.exists()) {
      const taskKey = snapshot.val();

      return {
        next: taskKey === key
      }
    }
  }).catch((error) => {
    console.error(error);
  });
});
