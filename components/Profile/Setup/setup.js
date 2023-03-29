import { initFirebase } from '../../firebase';
import { useRef, useEffect, useMemo } from 'react';
import { updateProfile, getAuth } from 'firebase/auth';
import styles from '../../../styles/setup.module.css'
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

export default function SetupAccount() {
    initFirebase();
    const auth = getAuth();

    const username = useRef();
    const container = useRef();

    const router = useRouter();

    const [user, loading] = useAuthState(auth);

    const avatar = useMemo(() => {
        return createAvatar(identicon, {
            backgroundColor: ['b6e3f4','c0aede','d1d4f9', 'ffd5dc','ffdfbf'],
            size: 48
        }).toDataUriSync();
    }, []);

    useEffect(() => {
        if(!user && !loading) {
            router.push('/');
        }

        if(user && user.displayName) {
            router.push('/profile');
        }
    })

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await updateProfile(auth.currentUser, {
                displayName:  username.current.value,
                photoURL: avatar,
            })
            router.push('/profile');
        }
        catch(error) {
            console.log(error.code);
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