import { initFirebase } from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { container, fadeIn } from '../HomePage/homepage';
import styles from '../../styles/form.module.css';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function RegisterForm( {darkForm} ) {
    initFirebase();
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const router = useRouter();

    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);

    const [emailErrorMessage, setEmailErrorMessage] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(null)

    useEffect(() => {
        if(user) {
            router.push('/profile/setup');
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
                    case 'auth/invalid-email':
                        setConfirmPasswordErrorMessage(null);
                        setPasswordErrorMessage(null);
                        setEmailErrorMessage('Enter An Email');
                        break;
                    case 'auth/weak-password':
                        setConfirmPasswordErrorMessage(null);
                        setEmailErrorMessage(null);
                        setPasswordErrorMessage('Password Must Be At Least 6 Characters Long');
                        break;
                    case 'auth/internal-error':
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
            setConfirmPasswordErrorMessage('Passwords Do Not Match');
        }
    }

    if(darkForm) {
        return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Sign Up</h1>
                <form onSubmit={handleRegister} method='post'>
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
                <p>Already have an account? <Link href='/login'>Login</Link></p>
            </div>
        </div>
        );
    }

    return (
        <motion.form onSubmit={handleRegister} method='post' initial="hidden" whileInView="show" delay={0.5} variants={container}
        className={styles.heroForm}>
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
        </motion.form>
    )
}