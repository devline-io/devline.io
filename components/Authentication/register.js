import { initFirebase } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { container, fadeIn } from '../HomePage/homepage';
import styles from '../../styles/form.module.css';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterForm( {darkForm} ) {
    initFirebase();
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const google = new GoogleAuthProvider();
    const microsoft = new OAuthProvider('microsoft.com');
    const github = new GithubAuthProvider();

    const router = useRouter();

    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);

    const [emailErrorMessage, setEmailErrorMessage] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(null)
    const [providerErrorMessage, setProviderErrorMessage] = useState(null);

    useEffect(() => {
        if(user) {
            router.push('/profile/setup');
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

        if(confirmPasswordErrorMessage) {
            confirmPassword.current.style.borderColor = '#393053';
            confirmPassword.current.style.borderWidth = '3px';
        } else {
            confirmPassword.current.style.borderColor = 'initial';
            confirmPassword.current.style.borderWidth = '2px';
        }
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        
        const formEmail = email.current.value;
        const formPassword = password.current.value;
        const formConfirmPassword = confirmPassword.current.value;

        if(formPassword == formConfirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, formEmail, formPassword );
            } 
            catch(error) {
                console.log(error.code);
                switch(error.code) {
                    case 'auth/email-already-in-use':
                        setProviderErrorMessage(null);
                        setConfirmPasswordErrorMessage(null);
                        setPasswordErrorMessage(null);
                        setEmailErrorMessage('An Account Using This Email Already Exists')
                        break;
                    case 'auth/invalid-email':
                        setProviderErrorMessage(null);
                        setConfirmPasswordErrorMessage(null);
                        setPasswordErrorMessage(null);
                        setEmailErrorMessage('Enter An Email');
                        break;
                    case 'auth/missing-email':
                        setProviderErrorMessage(null);
                        setConfirmPasswordErrorMessage(null);
                        setPasswordErrorMessage(null);
                        setEmailErrorMessage('Enter An Email');
                        break;
                    case 'auth/weak-password':
                        setProviderErrorMessage(null);
                        setConfirmPasswordErrorMessage(null);
                        setEmailErrorMessage(null);
                        setPasswordErrorMessage('Password Must Be At Least 6 Characters Long');
                        break;
                    case 'auth/internal-error':
                        setProviderErrorMessage(null);
                        setConfirmPasswordErrorMessage(null)
                        console.log(formPassword, formEmail.includes('@'), formEmail.includes('.'));
                        if(!(formEmail.includes('@') && formEmail.includes('.'))) {
                            setPasswordErrorMessage(null);
                            setEmailErrorMessage('Enter A Valid Email');
                        } else if(formPassword == '') {
                            setEmailErrorMessage(null);
                            setPasswordErrorMessage('Enter A Password');
                        }
                }
            }
        } else {
            setEmailErrorMessage(null);
            setPasswordErrorMessage(null);
            setProviderErrorMessage(null);
            setConfirmPasswordErrorMessage('Passwords Do Not Match');
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
                    setConfirmPasswordErrorMessage(null);
                    setPasswordErrorMessage(null);
                    setEmailErrorMessage(null)
                    setProviderErrorMessage('Account Exists Using A Different Provider');
            }
        }
    }

    if(darkForm) {
        return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Sign Up</h1>
                <form className={styles.form} onSubmit={handleRegister} method='post'>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input ref={email} type='text' id='email'/>
                        <span>{emailErrorMessage}</span>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input ref={password} type='password' id='password' />
                        <span>{passwordErrorMessage}</span>
                    </div>
                    <div>
                        <label htmlFor='confirm-password'>Confirm Your Password</label>
                        <input ref={confirmPassword} type='password' id='confirm-password'/>
                        <span>{confirmPasswordErrorMessage}</span>
                    </div>
                    <button className={styles.fullButton}>Sign Up</button>
                </form>
                <div className={styles.otherAuth}>
                    <p>Or Sign Up With:</p>
                    <div className={styles.authOptions}>
                        <div onClick={() => providerLogIn(google)} className={styles.authLogo}>
                            <Image src='/authentication/btn_google_dark_normal_ios.svg' fill/>
                        </div>
                        <div onClick={() => providerLogIn(microsoft)} className={styles.authLogo}>
                            <Image src='/authentication/ms-symbollockup_mssymbol_19.svg' fill/>
                        </div>
                        <div onClick={() => providerLogIn(github)} className={styles.authLogo}>
                            <Image src='/authentication/ms-symbollockup_mssymbol_19.svg' fill/>
                        </div>
                    </div>
                    <span>{providerErrorMessage}</span>
                </div>
                <hr/>
                <p>Already have an account? <Link href='/sign-in'>Sign In</Link></p>
            </div>
        </div>
        );
    }

    return (
        <motion.div className={styles.heroFormWrapper} initial="hidden" whileInView="show" delay={0.5} variants={container}>
            <form onSubmit={handleRegister} method='post'className={styles.heroForm}>
                <motion.div variants={fadeIn}>
                    <label htmlFor='email'>Email</label>
                    <input ref={email} type='text' id='email'/>
                    <span>{emailErrorMessage}</span>
                </motion.div>
                <motion.div variants={fadeIn}>
                    <label htmlFor='password'>Password</label>
                    <input ref={password} type='password' id='password' />
                    <span>{passwordErrorMessage}</span>
                </motion.div>
                <motion.div variants={fadeIn}>
                    <label htmlFor='confirm-password'>Confirm Your Password</label>
                    <input ref={confirmPassword} type='password' id='confirm-password'/>
                    <span>{confirmPasswordErrorMessage}</span>
                </motion.div>
                <motion.button variants={fadeIn}>Sign Up</motion.button>
            </form>
            <motion.div className={styles.otherAuth}>
                <motion.p variants={fadeIn}>Or Sign Up With:</motion.p>
                <div className={styles.authOptions}>
                    <motion.div onClick={() => providerLogIn(google)} className={styles.authLogo} variants={fadeIn}>
                        <Image src='/authentication/btn_google_dark_normal_ios.svg' fill/>
                    </motion.div>
                    <motion.div onClick={() => providerLogIn(microsoft)} className={styles.authLogo} variants={fadeIn}>
                        <Image src='/authentication/ms-symbollockup_mssymbol_19.svg' fill/>
                    </motion.div>
                    <motion.div onClick={() => providerLogIn(github)} className={styles.authLogo} variants={fadeIn}>
                        <Image src='/authentication/ms-symbollockup_mssymbol_19.svg' fill/>
                    </motion.div>
                </div>
                <span>{providerErrorMessage}</span>
            </motion.div>
        </motion.div>
    )
}