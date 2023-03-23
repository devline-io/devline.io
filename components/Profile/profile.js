import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase';
import { useState, useEffect } from 'react';

export default function Profile() {
    initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    
    useEffect(() => {
        if(!user) {
            router.push('/')
        }
        if(user) {
            setUsername(user.displayName);
        }
    })

    return(
        <div>
            <h1>Welcome {username}</h1>
            <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    )
}