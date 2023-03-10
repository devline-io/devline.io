// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Sleep from './sleep';

const firebaseConfig = {
  apiKey: "AIzaSyBkOlM6YGjO6FDsgmPfLDbeKIuHcMH3Kco",
  authDomain: "devline-34dae.firebaseapp.com",
  projectId: "devline-34dae",
  storageBucket: "devline-34dae.appspot.com",
  messagingSenderId: "404373457860",
  appId: "1:404373457860:web:07004a1bb219744a7b3291",
  measurementId: "G-MGWD301CFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default function Register(email, password) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            console.log("registered user and logged in as: " + userCredential.user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if(errorCode == 'auth/email-already-in-use') {
                email.setCustomValidity('Email is already in use');
                email.reportValidity();

                Sleep(3000).then(() => {
                    email.setCustomValidity('');
                });
            }

            console.log(errorCode, errorMessage);
          });
}