// Firebase Configuration
const firebaseConfig = {
    apiKey: "// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChYRPlcJf8BZ1X0zzN1MFNjM8RpzMp464",
  authDomain: "how-s-chat.firebaseapp.com",
  projectId: "how-s-chat",
  storageBucket: "how-s-chat.firebasestorage.app",
  messagingSenderId: "742363933025",
  appId: "1:742363933025:web:8f243b301917ba9f217d20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login Function
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Logged in successfully!");
            window.location.href = "chat.html"; // Redirect to chat page
        })
        .catch(error => alert(error.message));
}

// Signup Function
function signup() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Account created successfully!");
        })
        .catch(error => alert(error.message));
}
