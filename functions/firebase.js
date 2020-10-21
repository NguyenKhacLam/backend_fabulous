const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyAQ0dAS0-Q5NirZdftaoTaxx-jgv7heicU",
  authDomain: "fabulous-journey.firebaseapp.com",
  databaseURL: "https://fabulous-journey.firebaseio.com",
  projectId: "fabulous-journey",
  storageBucket: "fabulous-journey.appspot.com",
  messagingSenderId: "446494942081",
  appId: "1:446494942081:web:35244808886da1e8d03e80",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

exports.db = firebaseApp.firestore();
