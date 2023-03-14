// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7WJXKnU_BjfmGs0Qw6PkZICcHQNK_jYA",
    authDomain: "mama-80c30.firebaseapp.com",
    projectId: "mama-80c30",
    storageBucket: "mama-80c30.appspot.com",
    messagingSenderId: "1078594718626",
    appId: "1:1078594718626:web:e79ec79f6daabc9d1500fb",
    measurementId: "G-QCSFTJR8TR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);