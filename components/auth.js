import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Sleep from './sleep';

export function Register(email, password) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            window.location.href = '/profile/setup';
        })
        .catch((error) => {
            switch(error.code) {
                case 'auth/email-already-in-use':
                    email.setCustomValidity('Email is already in use');
                    email.reportValidity();
                    Sleep(3000).then(() => {
                        email.setCustomValidity('');
                    });
                    break;
                default:
                    email.setCustomValidity('unknown error');
                    email.reportValidity();
                    Sleep(3000).then(() => {
                        email.setCustomValidity('');
                    });
                    break;
            }
          });
}

export function Login(email, password) {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            if(auth.currentUser.displayName) {
                window.location.href = '/profile';
            } else {
                window.location.href = '/profile/setup';
            }
        })
        .catch((error) => {
            console.log(error.code);
        })
}