'use client'

import styles from '../../styles/form.module.css';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useRef, useState, useEffect } from 'react';
import { initFirebase } from '../../components/firebase';
import { useRouter } from 'next/navigation';

export default function PasswordReset() {
    initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const email = useRef(null);

    const [emailErrorMessage, setEmailErrorMessage] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email.current.value);
        } catch(error) {
            console.log(error.code)
            switch(error.code) {
                case 'auth/missing-email':
                    setEmailErrorMessage('Enter an Email');
                    break;
                case 'auth/invalid-email':
                    setEmailErrorMessage('Invalid Email');
                    break;
            }
        }
    }

    useEffect(() => {
        if(emailErrorMessage) {
            email.current.style.borderColor = '#393053';
            email.current.style.borderWidth = '3px';
        } else {
            email.current.style.borderColor = 'initial';
            email.current.style.borderWidth = '2px';
        }
    })

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.backButton}>
                    <a onClick={() => router.push('../sign-in')}>&larr; Back</a>
                </div>
                <h1>Reset Password</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input ref={email} id='email' type='text'/>
                        <span>{emailErrorMessage}</span>
                    </div>
                    <button className={styles.fullButton}>Submit</button>
                </form>
            </div>
        </div>
    )
}