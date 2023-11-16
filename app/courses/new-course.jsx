'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../../components/navbar";
import { useRef, useState, useEffect } from "react";
import { initFirebase } from "../../components/firebase";
import { getAuth } from "firebase/auth";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import styles from '../../styles/courses.module.css';
import { PythonProvider } from 'react-py';
import CodeEditor from '../../components/code-editor';

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

    const navItems = [
        <Link href='/'>Home</Link>,
        <Link href='/catalog'>Catalog</Link>, 
        <Link href='/'>Progress</Link>,
        ];

    return (
        <>
        {/*
            {profilePic && <Navbar 
              navItems={navItems} 
              navbarRef={nav}
              button={<button onClick={()=>router.push('/')} className={styles.alternateButton}>Upgrade</button>} 
              profilePic={profilePic} 
            />}
            */}

            <main>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h1>Course Title </h1>
                        <h3>Course Sub Title </h3>
                    </div>
                    <div className={styles.codeEditor}>
                    <PythonProvider>
                            <CodeEditor/>
                    </PythonProvider>
                    </div>
                </div>
            </main>
        </>
    )
}