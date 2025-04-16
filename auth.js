// auth.js
import { auth } from './firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

window.signInUser = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, pass)
    .then(() => alert("Signed in"))
    .catch(console.error);
};

window.signUpUser = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => alert("User Created"))
    .catch(console.error);
};

window.logOutUser = () => {
  signOut(auth).then(() => alert("Logged out")).catch(console.error);
};
