import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWcqey-fU7-7rY8_8NRxIl7XzwrIzOxiY",

  authDomain: "ledger-scroll.firebaseapp.com",

  projectId: "ledger-scroll",

  messagingSenderId: "608453731869",

  appId: "1:608453731869:web:aae1d27a702ec1927948f4",

  measurementId: "G-EGV46W5W8B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
