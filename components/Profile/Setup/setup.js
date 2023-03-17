import { auth } from '../../firebase';
import { useRef, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import styles from '../../../styles/setup.module.css'
import { useRouter } from 'next/router';

export default function SetupAccount() {
    const username = useRef();
    const container = useRef();

    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        updateProfile(auth.currentUser, {
            displayName:  username.current.value
        });
        router.push('/profile');
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