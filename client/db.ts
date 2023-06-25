import firebase from "firebase";

const APP = firebase.initializeApp({
  apiKey: "h5FEkx091avI6406XL6z71Mn0HuKBYXoI6jkiJfm",
  databaseURL: process.env.DB_URL,
  authDomain: "ppt-online-d22cc.firebaseapp.com",
  projectId: "ppt-online-d22cc",
});

const rtDb = firebase.database(APP);
const fsDb = firebase.firestore(APP);

export { rtDb, fsDb };
