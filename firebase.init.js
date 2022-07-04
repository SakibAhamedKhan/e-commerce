// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDlGqc5VhWuEDQzLi1ZAANxwFIUrECKFY",
  authDomain: "e-commerce-nextjs-e633d.firebaseapp.com",
  projectId: "e-commerce-nextjs-e633d",
  storageBucket: "e-commerce-nextjs-e633d.appspot.com",
  messagingSenderId: "610675458458",
  appId: "1:610675458458:web:23f339483cadd1238efa23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;