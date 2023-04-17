import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/form.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase';
import { GoogleAuthProvider, OAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
import Image from 'next/image';

export default function SignInForm()
{
    initFirebase();
    const auth = getAuth();
    const google = new GoogleAuthProvider();
    const microsoft = new OAuthProvider('microsoft.com');

    const router = useRouter();
    
    const email = useRef();
    const password = useRef();

    const [user] = useAuthState(auth);
    

    const [emailErrorMessage, setEmailErrorMessage] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
    const [providerErrorMessage, setProviderErrorMessage] = useState(null);

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
                    setProviderErrorMessage(null);
                    setPasswordErrorMessage(null);
                    setEmailErrorMessage('Enter An Email');
                    break;
                case 'auth/invalid-email':
                    setProviderErrorMessage(null);
                    setPasswordErrorMessage(null);
                    setEmailErrorMessage('Invalid Email');
                    break;
                case 'auth/user-not-found':
                    setProviderErrorMessage(null);
                    setPasswordErrorMessage(null);
                    setEmailErrorMessage('User With This Email Not Found');
                    break;
                //password
                case 'auth/wrong-password':
                    setProviderErrorMessage(null);
                    setEmailErrorMessage(null);
                    setPasswordErrorMessage('Wrong Password');
                    break;
                case 'auth/internal-error':
                    setProviderErrorMessage(null);
                    setEmailErrorMessage(null);
                    if(formPassword == '') {
                        setPasswordErrorMessage('Enter A Password');
                        break;
                    }
                    setEmailErrorMessage('Internal Error: Try Again Later');
                    setProviderErrorMessage(null);
                    setPasswordErrorMessage(null);
            }
        }

    }

    const providerLogIn = async(provider) => {
        try {
            await signInWithPopup(auth, provider);
            router.push('/profile');
        } 
        catch(error) {
            console.log(error.code);
            switch(error.code) {
                case 'auth/account-exists-with-different-credential':
                    setPasswordErrorMessage(null);
                    setEmailErrorMessage(null)
                    setProviderErrorMessage('Account Exists Using A Different Provider');
            }
        }
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
                        <div onClick={() => providerLogIn(google)} className={styles.authLogo}>
                            <Image src='/authentication/btn_google_dark_normal_ios.svg' fill/>
                        </div>
                        <div onClick={() => providerLogIn(microsoft)} className={styles.authLogo}>
                            <Image src='/authentication/ms-symbollockup_mssymbol_19.svg' fill/>
                        </div>
                    </div>
                    <span>{providerErrorMessage}</span>
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