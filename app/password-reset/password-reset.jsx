'use client'

import styles from '../../styles/form.module.css';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useRef } from 'react';
import { initFirebase } from '../../components/firebase';

export default function PasswordReset() {
    initFirebase();
    const auth = getAuth();

    const email = useRef(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email.current.value);
        } catch(error) {
            console.log(error.code);
        }
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Reset Password</h1>
                <form>
                    <div>
                        <label className={styles.email} htmlFor='email'>Email</label>
                        <input ref={email} required id='email' type='text'/>
                    </div>
                    <button className={styles.fullButton} onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}