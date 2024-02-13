'use client'

import styles from '../../../styles/form.module.css';
import { useRef } from 'react';

export default function PasswordResetAction() {
    const password = useRef(null);
    const confirmPassword = useRef(null);

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Reset Password</h1>
                <form className={styles.form} >
                    <div>
                        <div>
                            <label htmlFor='password'>New Password</label>
                            <input ref={password} required id='password' type='password'/>
                        </div>
                        <div>
                            <label htmlFor='confirmPassword'>Confirm New Password</label>
                            <input ref={confirmPassword} required id='confirmPassword' type='password'/>
                        </div>
                    </div>
                    <button className={styles.fullButton}>Submit</button>
                </form>
            </div>
        </div>
    )
}