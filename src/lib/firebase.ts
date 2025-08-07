import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7_96uDKttkK_HiZJ3uJn3hkzDw9Yunu8",
  authDomain: "rso-database-b8334.firebaseapp.com",
  databaseURL: "https://rso-database-b8334-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rso-database-b8334",
  storageBucket: "rso-database-b8334.appspot.com",
  messagingSenderId: "387298589199",
  appId: "1:387298589199:web:65007572c5ac966e9d017a",
  measurementId: "G-5MRG1BPEKD"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app); 