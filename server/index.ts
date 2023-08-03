import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { rtDb, fsDb } from "./db-admin";

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

const usersColl = fsDb.collection("users");
const roomsColl = fsDb.collection("rooms");

// //cambiar x entidad users

app.post("/signup", (req, res) => {
  const { userEmail } = req.body;
  const { userName } = req.body;

  usersColl
    .where("email", "==", userEmail)
    .get()
    .then((searchedEmail) => {
      if (searchedEmail.empty) {
        usersColl
          .add({
            userEmail,
            userName,
          })
          .then((userRef) => {
            res.json({ userId: userRef.id });
          });
      } else {
        //ver como arrojar errores con las promesas
        res.status(400).json({ err: "User already exists" });
      }
    });
});

app.post("/auth", (req, res) => {
  const { userEmail } = req.body;

  usersColl
    .where("userEmail", "==", userEmail)
    .get()
    .then((docsData) => {
      if (docsData.empty) {
        res.status(400).json({ err: "Email not found" });
      } else {
        const searchedDocId = docsData.docs[0].id;
        const searchedDoc = docsData.docs[0].data();
        res.json({
          userId: searchedDocId,
          userEmail: searchedDoc.userEmail,
          userName: searchedDoc.userName,
        });
      }
    });
});

app.post("/rooms", (req, res) => {
  console.log("get a 62");
  const { userId } = req.body;
  usersColl
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = rtDb.ref(`rooms/${uuidv4()}`);
        roomRef.set({ currentGame: false, history: false }).then(() => {
          const roomLongId = roomRef.key;
          const roomSimpleId = (
            1000 + Math.floor(Math.random() * 999)
          ).toString();
          roomsColl
            .doc(roomSimpleId)
            .set({
              rtDbRoomId: roomLongId,
            })
            .then(() => {
              res.json({ roomSimpleId });
            });
        });
      } else {
        res
          .status(401)
          .json({ err: "User ID does not exist, please authenticate" });
      }
    });
});

app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { userName } = req.query;
  const { roomId } = req.params;

  console.log("get a 92");

  usersColl
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsColl
          .doc(roomId)
          .get()
          .then((snap) => {
            if (snap.exists) {
              const { rtDbRoomId } = snap.data();
              const roomRef = rtDb.ref(`rooms/${rtDbRoomId}/currentGame`);
              const roomUserRef = rtDb.ref(
                `rooms/${rtDbRoomId}/currentGame/${userId}`
              );
              roomRef.once("value").then((snap) => {
                // ver porque ONCE
                if (snap.numChildren() < 2) {
                  roomUserRef.set({
                    userName,
                    choice: "",
                    start: false,
                  });
                  res.json({ rtDbRoomId });
                } else {
                  res
                    .status(401)
                    .json({ err: "number of people joined exceeded" });
                }
              });
            } else {
              res.status(401).json({ err: "Entered room does not exist" });
            }
          });
      } else {
        res
          .status(401)
          .json({ err: "User ID does not exist, please authenticate" });
      }
    });
});

app.delete("/rooms/:roomId/users/:userId", (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.params;

  usersColl
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsColl
          .doc(roomId)
          .get()
          .then((snap) => {
            if (snap.exists) {
              const { rtDbRoomId } = snap.data();
              const userRef = rtDb.ref(
                `rooms/${rtDbRoomId}/currentGame/${userId}`
              );
              userRef
                .remove()
                .then(() => {
                  res.json("successfully removed");
                })
                .catch(() => {
                  res.json("Remove failed.");
                });
            } else {
              res.status(401).json({ err: "Entered room does not exist" });
            }
          });
      } else {
        res
          .status(401)
          .json({ err: "User ID does not exist, please authenticate" });
      }
    });
});

app.patch("/rooms/:roomId/users/:userId", (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.params;
  console.log("patch de userID");

  usersColl
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsColl
          .doc(roomId)
          .get()
          .then((snap) => {
            if (snap.exists) {
              const { rtDbRoomId } = snap.data();
              const userRef = rtDb.ref(
                `rooms/${rtDbRoomId}/currentGame/${userId}`
              );
              userRef
                .update(req.body)
                .then(() => {
                  res.json("update succeeded.");
                })
                .catch(() => {
                  res.json("update failed.");
                });
            } else {
              res.status(401).json({ err: "Entered room does not exist" });
            }
          });
      } else {
        res
          .status(401)
          .json({ err: "User ID does not exist, please authenticate" });
      }
    });
});

app.patch("/rooms/:roomId/history", (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.query;

  console.log("patch history");
  // console.log("room ID", roomId);

  usersColl
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsColl
          .doc(roomId)
          .get()
          .then((snap) => {
            if (snap.exists) {
              const { rtDbRoomId } = snap.data();
              const userRef = rtDb.ref(`rooms/${rtDbRoomId}/history`);
              userRef
                .update(req.body)
                .then(() => {
                  res.json("update succeeded.");
                })
                .catch(() => {
                  res.json("update failed.");
                });
            } else {
              res.status(401).json({ err: "Entered room does not exist" });
            }
          });
      } else {
        res
          .status(401)
          .json({ err: "User ID does not exist, please authenticate" });
      }
    });
});

// app.delete("/rooms/:roomId/history", (req, res) => {
//   const { roomId } = req.params;
//   const { userId } = req.query;

//   usersColl
//     .doc(userId.toString())
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         roomsColl
//           .doc(roomId)
//           .get()
//           .then((snap) => {
//             if (snap.exists) {
//               const { rtDbRoomId } = snap.data();
//               const userRef = rtDb.ref(`rooms/${rtDbRoomId}/history`);
//               userRef
//                 .remove()
//                 .then(() => {
//                   res.json("successfully removed");
//                 })
//                 .catch(() => {
//                   res.json("delete failed.");
//                 });
//             } else {
//               res.status(401).json({ err: "Entered room does not exist" });
//             }
//           });
//       } else {
//         res
//           .status(401)
//           .json({ err: "User ID does not exist, please authenticate" });
//       }
//     });
// });

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
