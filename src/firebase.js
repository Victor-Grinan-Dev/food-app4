import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDx6xlQZ6663tFb_ZQV2D9ekKakZ3M0CHE",
  authDomain: "foodapp4-ee4ca.firebaseapp.com",
  projectId: "foodapp4-ee4ca",
  storageBucket: "foodapp4-ee4ca.appspot.com",
  messagingSenderId: "307704093485",
  appId: "1:307704093485:web:5d005494b98d664d4dd1a4",
  measurementId: "G-EXJTJYHRVF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);