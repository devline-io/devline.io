import { initFirebase } from '../../firebase';
import { useRef, useEffect, useMemo, useState } from 'react';
import { updateProfile, getAuth } from 'firebase/auth';
import styles from '../../../styles/form.module.css'
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

    const [error, setError] = useState(null);

    const makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    const avatar = useMemo(() => {
        return createAvatar(identicon, {
            backgroundColor: ['b6e3f4','c0aede','d1d4f9', 'ffd5dc','ffdfbf'],
            size: 48,
            seed: makeid(5)
        }).toDataUriSync();
    }, []);

    useEffect(() => {
        if(!user && !loading) {
            router.push('/');
        }

        if(user && user.displayName && user.photoURL) {
            router.push('/profile');
        }

        if(error) {
            username.current.style.borderColor = '#393053';
            username.current.style.borderWidth = '3px';
        } else {
            username.current.style.borderColor = 'initial';
            username.current.style.borderWidth = '2px';
        }
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(username.current.value != '') {
            setError(null);
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
        } else {
            setError('Please Enter A Username');
        }
    }

    return(
        <div className={styles.wrapper}>
            <div ref={container} className={styles.container}>
                <h1>Lets Finish Setting Up Your Account</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input ref={username} id='username' type='text'/>
                        <span>{error}</span>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}