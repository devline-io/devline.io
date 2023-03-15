import { auth } from '../../firebase';
import { useRef, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function SetupAccount() {
    const username = useRef();
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(auth.currentUser);
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
        <>
            <h1>Lets Finish Setting Up Your Account</h1>
            <form>
                <label htmlFor='username'>Username</label>
                <input ref={username} required id='username' type='text'/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}