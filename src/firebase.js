
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOPrnO5JxjXm2oWl2eCh5OS9bPAkCKdKc",
  authDomain: "fuprojectteammanagement.firebaseapp.com",
  projectId: "fuprojectteammanagement",
  storageBucket: "fuprojectteammanagement.appspot.com",
  messagingSenderId: "493348411624",
  appId: "1:493348411624:web:4c2ad6287cbf6ebea5115d",
  measurementId: "G-ZXFXQEF9MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

