'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../../../components/navbar";
import { useRef, useState, useEffect } from "react";
import { initFirebase } from "../../../components/firebase";
import { getAuth } from "firebase/auth";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import styles from '../../../styles/courses.module.css';

export default function TestCourse({jsonOutline}) {
    initFirebase();
    const auth = getAuth()

    const router = useRouter();

    const nav = useRef(null);

    const [user, loading] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    const outline = JSON.parse(JSON.stringify(jsonOutline));
    for(let chapter = 0; chapter < outline.length; chapter++) {
        console.log(outline[''][`chapter${chapter+1}`].title);
        for(let unit = 0; unit < outline[''][`chapter${chapter+1}`].length; unit++) {
            console.log(outline[''][`chapter${chapter+1}`][`unit${unit+1}`].title)
            for(let lesson = 0; lesson < outline[''][`chapter${chapter+1}`][`unit${unit+1}`].length; lesson++) {
                console.log(outline[''][`chapter${chapter+1}`][`unit${unit+1}`][`lesson${lesson+1}`].title)
            }
        }
    }

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
            router.push('sign-up/?nextPath=courses');
        }
    })

    const navItems = [
        <Link href='/'>Home</Link>,
        <Link href='/catalog'>Catalog</Link>, 
        <Link href='/'>Progress</Link>,
        ];

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