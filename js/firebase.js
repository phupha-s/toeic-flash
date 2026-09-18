import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVTZZvQuHAXY33U0PdyrJUA9f8zE6PJR8",
  authDomain: "toeic-flash.firebaseapp.com",
  databaseURL: "https://toeic-flash-default-rtdb.firebaseio.com",
  projectId: "toeic-flash",
  storageBucket: "toeic-flash.firebasestorage.app",
  messagingSenderId: "534176894744",
  appId: "1:534176894744:web:eed6def74094b4890f186d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, push, onValue, update };
