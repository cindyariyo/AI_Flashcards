// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCexB9-VGjHbkP-C4Zla5Asw6d_xcbD8g0",
  authDomain: "flashcards-saas-2c83e.firebaseapp.com",
  projectId: "flashcards-saas-2c83e",
  storageBucket: "flashcards-saas-2c83e.appspot.com",
  messagingSenderId: "118338650379",
  appId: "1:118338650379:web:b5e6239f65c0a0ccab220e",
  measurementId: "G-EVQYFH629B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);