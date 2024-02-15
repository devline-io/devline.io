'use client'

import styles from '../../../styles/form.module.css';
import { use, useRef, useState, useEffect } from 'react';
import { initFirebase } from '../../../components/firebase';
import { getAuth, confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { useSearchParams } from 'next/navigation';

export default function PasswordResetAction() {
    initFirebase();
    const auth = getAuth();

    const searchParams = useSearchParams();

            
    const password = useRef(null);
    const confirmPassword = useRef(null);

    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(null);

    const [passwordReset, setPasswordReset] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await verifyPasswordResetCode(auth, searchParams.get('oobCode'))
            
            if(password.current.value == confirmPassword.current.value) {
                try {
                    await confirmPasswordReset(auth, searchParams.get('oobCode'), password.current.value)
                    setPasswordReset(true);
                }
                catch(error) {
                    console.log(error.code)
                    switch(error.code) {
                        case 'auth/weak-password':
                            setPasswordErrorMessage('Password Must Be At Least 6 Characters Long');
                            setConfirmPasswordErrorMessage(null);
                    }
                }
            } else {
                setPasswordErrorMessage(null);
                setConfirmPasswordErrorMessage('Passwords Do Not Match');
            }
        }
        catch(error) {
            switch(error.code){
                case 'auth/expired-action-code':
                    setPasswordErrorMessage(' ');
                    setConfirmPasswordErrorMessage('Link Expired');
                    break;
            }
        } 
    }

    useEffect(() => {
        if(passwordErrorMessage) {
            password.current.style.borderColor = '#393053';
            password.current.style.borderWidth = '3px';
        } else if(!passwordReset) {
            password.current.style.borderColor = 'initial';
            password.current.style.borderWidth = '2px';
        }

        if(confirmPasswordErrorMessage) {
            confirmPassword.current.style.borderColor = '#393053';
            confirmPassword.current.style.borderWidth = '3px';
        } else if(!passwordReset) {
            confirmPassword.current.style.borderColor = 'initial';
            confirmPassword.current.style.borderWidth = '2px';
        }
    })

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {!passwordReset && <h1>Reset Password</h1>}
                {!passwordReset && <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor='password'>New Password</label>
                            <input ref={password} id='password' type='password'/>
                            <span>{passwordErrorMessage}</span>
                        </div>
                        <div>
                            <label htmlFor='confirmPassword'>Confirm New Password</label>
                            <input ref={confirmPassword} id='confirmPassword' type='password'/>
                            <span>{confirmPasswordErrorMessage}</span>
                        </div>
                    </div>
                    <button className={styles.fullButton}>Submit</button>
                </form>}
                {passwordReset && <h1>Password Was Reset Successfully</h1>}
            </div>
        </div>
    )
}