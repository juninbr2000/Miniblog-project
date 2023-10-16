
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBqlosHRcfhs0sQA8b1RWuCYXbFsTkmJQM",
  authDomain: "miniblog-df7be.firebaseapp.com",
  projectId: "miniblog-df7be",
  storageBucket: "miniblog-df7be.appspot.com",
  messagingSenderId: "990960913407",
  appId: "1:990960913407:web:15724364b30cc7aeae75ca"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }
