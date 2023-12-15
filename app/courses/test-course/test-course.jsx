'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../../../components/navbar";
import { useRef, useState, useEffect } from "react";
import { initFirebase } from "../../../components/firebase";
import { getAuth } from "firebase/auth";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import styles from '../../../styles/courses.module.css';
import { MDXRemote } from 'next-mdx-remote'

export default function TestCourse({props}) {
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
            router.push('/sign-up/?nextPath=courses');
        }
        console.log(props.lessons['Chapter Title'])

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
            <div className={styles.course}>
                <ul className={styles.outline}>
                    {props.chapters.map((chapter) => {
                        return (
                            <li>
                                {chapter}
                                <ul>
                                    {props.units[chapter].map((unit) => {
                                        return (
                                            <li>
                                                {unit}
                                                <ul>
                                                    {props.lessons[chapter][unit].map((lesson) => {
                                                        return <li>{lesson}</li>
                                                    })}
                                                </ul>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>)
                    })}
                </ul>
                <div className={styles.courseText}>
                    <MDXRemote {...props.C1U1}/>
                </div>
            </div>
            
        </>
    )
}