// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyB7F1uRRiGdw489c_18aJeodbxrzsdFb5c",
  authDomain: "exonova-cd89c.firebaseapp.com",
  projectId: "exonova-cd89c",
  storageBucket: "exonova-cd89c.firebasestorage.app",
  messagingSenderId: "465326262278",
  appId: "1:465326262278:web:1b7f8f62e1f46c5ca7db87",
  measurementId: "G-GGG45V0PEF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
