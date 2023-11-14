'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../../components/navbar";
import { useRef, useState, useEffect } from "react";
import { initFirebase } from "../../components/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function NewCourse() {
    initFirebase();
    const auth = getAuth()

    const router = useRouter();

    const nav = useRef(null);

    const [user, loading] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        if(user) {
            if(!user.displayName || !user.photoURL) {
                router.push('/dashboard/setup');
            } else {
                setUsername(user.displayName);
                setProfilePic(user.photoURL);
            }
        }
        if(!user && !loading) {
            console.log(user);
            router.push('/sign-in');
        }
    })

    return (
        <>
            {profilePic && <Navbar 
              navItems={navItems} 
              navbarRef={nav}
              button={<button onClick={()=>router.push('/')} className={styles.alternateButton}>Upgrade</button>} 
              profilePic={profilePic} 
            />}
        </>
    )
}