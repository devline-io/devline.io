import { auth } from '../../firebase';
import { useRef } from 'react';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import styles from '../../../styles/setup.module.css'

export default function SetupAccount() {
    const username = useRef();
    const router = useRouter();

    const container = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(auth.currentUser) {
            updateProfile(auth.currentUser, {
                displayName:  username.current.value
            });
            router.push('/profile');  
        } else {
            router.push('/');
        } 
    }

    return(
        <div className={styles.wrapper}>
            <div ref={container} className={styles.container}>
                <h1>Lets Finish Setting Up Your Account</h1>
                <form>
                    <label htmlFor='username'>Username</label>
                    <input ref={username} required id='username' type='text'/>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}