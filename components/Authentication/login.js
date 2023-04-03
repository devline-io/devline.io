import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/form.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';

export default function LoginForm()
{
    initFirebase();
    const auth = getAuth();
    const router = useRouter();
    
    const email = useRef();
    const password = useRef();

    const [user] = useAuthState(auth);

    const [emailErrorMessage, setEmailErrorMessage] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

    useEffect(() => {
        if(user) {
            router.push('/profile');
        }
    })

    const handleLogin = async(event) => {
        event.preventDefault();
        const formEmail = email.current.value;
        const formPassword = email.current.value;

        try {
            await signInWithEmailAndPassword(auth, formEmail, formPassword);
        } 
        catch(error) {
            console.log(error.code);

            if(error.code == 'auth/invalid-email') {
                setEmailErrorMessage('Invalid Email');
            }
            else if(error.code == 'auth/invalid-password') {
                setPasswordErrorMessage('Incorrect Password');
            } else {
                setEmailErrorMessage('An Internal Error Occur');
                setPasswordErrorMessage('Internal Error');
            }
        }

    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='text' ref={email}/>
                        <span>{emailErrorMessage}</span>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' ref={password}/>
                        <span>{passwordErrorMessage}</span>
                    </div>
                    <button className={styles.fullButton}>Login</button>
                </form>
                <p>Don&apos;t have an account? <Link href='/sign-up'>Sign Up</Link></p>
            </div>
        </div>
    )
}