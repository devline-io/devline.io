import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Navbar from '../navbar';
import Image from 'next/image';

export default function Profile() {
    initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    
    useEffect(() => {
        if(user) {
            if(!user.displayName) {
                router.push('/profile/setup');
            } else {
                setUsername(user.displayName);
                setProfilePic(user.photoURL);
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
            {profilePic && <Navbar navItems={navItems} button={<Image src={profilePic} width={64} height={64}/>}/>}
            <h1>Welcome {username}</h1>
            <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    )
}