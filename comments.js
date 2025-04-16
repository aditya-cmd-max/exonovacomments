// comments.js
import { db, auth } from './firebase.js';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const commentInput = document.getElementById("comment-input");
const commentsContainer = document.getElementById("comments-container");

window.postComment = async () => {
  const user = auth.currentUser;
  if (!user || !commentInput.value) return;

  await addDoc(collection(db, "comments"), {
    uid: user.uid,
    displayName: user.email,
    content: commentInput.value,
    createdAt: serverTimestamp(),
    likes: [],
    replies: [],
    reports: [],
    photoURL: user.photoURL || "https://api.dicebear.com/7.x/thumbs/svg?seed=" + user.uid
  });
  commentInput.value = "";
};

const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
onSnapshot(q, (snapshot) => {
  commentsContainer.innerHTML = "";
  snapshot.forEach(doc => {
    const c = doc.data();
    const div = document.createElement("div");
    div.classList.add("comment");
    div.innerHTML = `
      <div class="comment-header">
        <img src="${c.photoURL}" />
        <strong>${c.displayName}</strong>
      </div>
      <p>${c.content}</p>
      <button onclick="alert('Reply coming soon')">💬 Reply</button>
      <button onclick="alert('Reported')">🚩 Report</button>
      <button onclick="alert('Liked')">❤️ Love</button>
    `;
    commentsContainer.appendChild(div);
  });
});
