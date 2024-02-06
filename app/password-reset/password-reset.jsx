'use client'

import styles from '../../styles/form.module.css';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useRef } from 'react';
import { initFirebase } from '../../components/firebase';
import { useRouter } from 'next/navigation';

export default function PasswordReset() {
    initFirebase();
    const auth = getAuth();
    const router = useRouter();

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
                <div className={styles.backButton}>
                    <a onClick={() => router.push('../sign-in')}>&larr; Back</a>
                </div>
                <h1>Reset Password</h1>
                <form className={styles.form}onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.email} htmlFor='email'>Email</label>
                        <input ref={email} required id='email' type='text'/>
                    </div>
                    <button className={styles.fullButton}>Submit</button>
                </form>
            </div>
        </div>
    )
}