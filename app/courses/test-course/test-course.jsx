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
import SmoothScroll from "../../../components/smooth-scroll";

export default function TestCourse({props}) {
    initFirebase();
    const auth = getAuth()

    const router = useRouter();

    const nav = useRef(null);

    const [user, loading] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    const courseRefs = {}

    for(let chapter = 1; chapter <= props.chapters.length; chapter++) {
        courseRefs[`c${chapter}`] = useRef(null);
        //console.log(courseRefs[`c${chapter}`])
        for(let unit = 1; unit <= props.units[props.chapters[chapter-1]].length; unit++) {
            courseRefs[`c${chapter}u${unit}`] = useRef(null);
            //console.log(courseRefs[`c${chapter}u${unit}`])
            for(let lesson = 1; lesson <= props.lessons[props.chapters[chapter-1]][props.units[props.chapters[chapter-1]][unit-1]].length; lesson++) {
                courseRefs[`c${chapter}u${unit}l${lesson}`] = useRef(null);
                //console.log(courseRefs[`c${chapter}u${unit}l${lesson}`])
            }
        }
    }

    console.log(courseRefs)

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
            router.push('/sign-up/?nextPath=courses/test-course');
        }

    })

    

    const navItems = [
        <Link href='/'>Home</Link>,
        <Link href='/courses'>Catalog</Link>, 
        <Link href='/'>Progress</Link>,
        ];

    const lessonClicked = (item) => {
        console.log('clicked ', item);
    }

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
                                    {props.units[chapter].map((unit, uIndex) => {
                                        return (
                                            <li>
                                                {unit}
                                                <ul>
                                                    {props.lessons[chapter][unit].map((lesson,lIndex) => {
                                                        return <li><a href="#" onClick={() => SmoothScroll(courseRefs[`c1u${uIndex+1}l${lIndex+1}`], nav)}>{lesson}</a></li>
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
                    <MDXRemote {...props.C1U1} scope={courseRefs}/>
                </div>
            </div>
            
        </>
    )
}