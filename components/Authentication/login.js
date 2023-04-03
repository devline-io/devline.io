import { useRef, useEffect } from 'react';
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

    useEffect(() => {
        if(user) {
            router.push('/profile');
        }
    })

    const handleLogin = async(event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
        } 
        catch(error) {
            console.log(error.code);
        }

    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input required id='email' type='text' ref={email}/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input required id='password' type='password' ref={password}/>
                    </div>
                    <button className={styles.fullButton}>Login</button>
                </form>
                <p>Don&apos;t have an account? <Link href='/sign-up'>Sign Up</Link></p>
            </div>
        </div>
    )
}