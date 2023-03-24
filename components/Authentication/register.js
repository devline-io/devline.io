import { initFirebase } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { container, fadeIn } from '../HomePage/homepage';
import styles from '../../styles/homepage.module.css';
import { useRef, useEffect } from 'react';

export default function RegisterForm() {
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

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
        } 
        catch(error) {
            console.log(error.code);
        }
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