import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Navbar from '../navbar';

export default function Profile() {
    initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    
    useEffect(() => {
        if(user) {
            if(!user.displayName) {
                router.push('/profile/setup');
            } else {
                setUsername(user.displayName);
            }
        } else {
            router.push('/');
        }
    })

    const navItems = [
        <Link href='/'>Home</Link>,
        <Link href='/'>Catalog</Link>, 
        <Link href='/'>Progress</Link>,
        <Link href='/'>Upgrade</Link>
        ];

    return(
        <div>
            <Navbar navItems={navItems} button={<p>{username}</p>}/>
            <h1>Welcome</h1>
            <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    )
}