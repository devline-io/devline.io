import { initFirebase } from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { container, fadeIn } from '../HomePage/homepage';
import styles from '../../styles/form.module.css';
import { useRef, useEffect } from 'react';
import Link from 'next/link';

export default function RegisterForm( {darkForm} ) {
    initFirebase();
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const router = useRouter();

    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);

    useEffect(() => {
        if(user) {
            router.push('/profile/setup');
        }
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
        } 
        catch(error) {
            console.log(error.code);
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
                        <input required ref={email} type='email' id='email'/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input required ref={password} type='password' id='password' />
                    </div>
                    <div>
                        <label htmlFor='confirm-password'>Confirm Your Password</label>
                        <input required ref={confirmPassword} type='password' id='confirm-password'/>
                    </div>
                    <button className={styles.fullSize}>Sign Up</button>
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
                <input required ref={email} type='email' id='email'/>
            </motion.div>
            <motion.div variants={fadeIn}>
                <label htmlFor='password'>Password</label>
                <input required ref={password} type='password' id='password' />
            </motion.div>
            <motion.div variants={fadeIn}>
                <label htmlFor='confirm-password'>Confirm Your Password</label>
                <input required ref={confirmPassword} type='password' id='confirm-password'/>
            </motion.div>
            <motion.button variants={fadeIn}>Sign Up</motion.button>
        </motion.form>
    )
}