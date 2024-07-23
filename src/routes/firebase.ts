import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKbixG24oA6Z2ezq-6q0ZUdk488n51fvg",
  authDomain: "nomad-twitter-clone-63b97.firebaseapp.com",
  projectId: "nomad-twitter-clone-63b97",
  storageBucket: "nomad-twitter-clone-63b97.appspot.com",
  messagingSenderId: "84359956406",
  appId: "1:84359956406:web:c9b584096d391549f22317",
  measurementId: "G-RRXJJZQMCQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
