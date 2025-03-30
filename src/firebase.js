import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBjBQmUuZCZguYUl1UUiGFs1Q9SLoj-xLk",
  authDomain: "finwise-22be7.firebaseapp.com",
  projectId: "finwise-22be7",
  storageBucket: "finwise-22be7.firebasestorage.app",
  messagingSenderId: "16803732402",
  appId: "1:16803732402:web:71cc274cefae30d458e2ab",
  databaseURL: "https://finwise-22be7-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);


