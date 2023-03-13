import app from './firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Sleep from './sleep';

const auth = getAuth();

export function Register(email, password) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .catch((error) => {
            switch(error.code) {
                case 'auth/email-already-in-use':
                    email.setCustomValidity('Email is already in use');
                    email.reportValidity();
                    Sleep(3000).then(() => {
                        email.setCustomValidity('');
                    });
                    break;
            }

            console.log(errorCode, errorMessage);
          });
}