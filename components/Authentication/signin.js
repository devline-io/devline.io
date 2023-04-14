import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/form.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';

export default function SignInForm()
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

        if(emailErrorMessage) {
            email.current.style.borderColor = '#393053';
            email.current.style.borderWidth = '3px';
        } else {
            email.current.style.borderColor = 'initial';
            email.current.style.borderWidth = '2px';
        }

        if(passwordErrorMessage) {
            password.current.style.borderColor = '#393053';
            password.current.style.borderWidth = '3px';
        } else {
            password.current.style.borderColor = 'initial';
            password.current.style.borderWidth = '2px';
        }
    })

    const handleLogin = async(event) => {
        event.preventDefault();
        const formEmail = email.current.value;
        const formPassword = password.current.value;

        try {
            await signInWithEmailAndPassword(auth, formEmail, formPassword);
        } 
        catch(error) {
            switch(error.code) {
                //email
                case 'auth/missing-email':
                    setPasswordErrorMessage(null);
                    setEmailErrorMessage('Enter An Email');
                    break;
                case 'auth/invalid-email':
                    setPasswordErrorMessage(null);
                    setEmailErrorMessage('Invalid Email');
                    break;
                case 'auth/user-not-found':
                    setPasswordErrorMessage(null);
                    setEmailErrorMessage('User With This Email Not Found');
                    break;
                //password
                case 'auth/wrong-password':
                    setEmailErrorMessage(null);
                    setPasswordErrorMessage('Wrong Password');
                    break;
                case 'auth/internal-error':
                    setEmailErrorMessage(null);
                    if(formPassword == '') {
                        setPasswordErrorMessage('Enter A Password');
                        break;
                    }
                    setEmailErrorMessage('Internal Error: Try Again Later');
                    setPasswordErrorMessage(null);
            }
        }

    }

    const googleLogIn = () => {
        signInWithRedirect(auth, google);
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Login</h1>
                <form className={styles.form} onSubmit={handleLogin}>
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
                <div className={styles.otherAuth}>
                    <p>Or Sign In With:</p>
                    <div className={styles.authOptions}>
                        <div onClick={googleLogIn} className={styles.authLogo}>
                            <Image src='/authentication/btn_google_dark_normal_ios.svg' fill/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div>
                    <p>Don&apos;t have an account? <Link href='/sign-up'>Sign Up</Link></p>
                    <Link className={styles.resetPassword} href='/password-reset'>Reset Password</Link>
                </div>
            </div>
        </div>
    )
}