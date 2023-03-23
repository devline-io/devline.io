import { initFirebase } from '../../firebase';
import { useRef, useEffect } from 'react';
import { updateProfile, getAuth } from 'firebase/auth';
import styles from '../../../styles/setup.module.css'
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SetupAccount() {
    initFirebase();
    const auth = getAuth();

    const username = useRef();
    const container = useRef();

    const router = useRouter();

    const [user] = useAuthState(auth);

    useEffect(() => {
        if(!user) {
            router.push('/')
        }
    })

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await updateProfile(auth.currentUser, {displayName:  username.current.value})
            router.push('/profile');
        }
        catch {
            console.log("an error occurred");
        }
    }

    return(
        <div className={styles.wrapper}>
            <div ref={container} className={styles.container}>
                <h1>Lets Finish Setting Up Your Account</h1>
                <form>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input ref={username} required id='username' type='text'/>
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}