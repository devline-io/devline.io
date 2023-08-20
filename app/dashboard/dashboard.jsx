'use client'

import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../../components/firebase';
import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/profile.module.css';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import CatalogImages from '../../components/catalogimages';
import { fadeIn } from '../homepage';

export default function Dashboard({courses}) {
    initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const nav = useRef(null);

    const [user, loading] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    const imageRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    useEffect(() => {
        for (let index = 0; index < imageRefs.length; index++) {
            if(imageRefs[index].current != null) {
                let ref = imageRefs[index].current;
                ref.addEventListener('mousemove', (event) => {
                    const width   = ref.offsetWidth;
                    const height  = ref.offsetHeight;
                    const centerX = ref.offsetLeft + width/2;
                    const centerY = ref.offsetTop + height/2;
                    const mouseX  = event.pageX - centerX;
                    const mouseY  = event.pageY - centerY;
                    const rotateX = -10 * mouseY / (height / 2);
                    const rotateY = 10 * mouseX / (width / 2)

                    ref.style.transform = `perspective(1000px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });
            }
        }
    });
    
    useEffect(() => {
        if(user) {
            if(!user.displayName || !user.photoURL) {
                router.push('/profile/setup');
            } else {
                setUsername(user.displayName);
                setProfilePic(user.photoURL);
            }
        }
        if(!user && !loading) {
            console.log(user);
            router.push('/');
        }
    })

    const navItems = [
        <Link href='/'>Home</Link>,
        <Link href='/catalog'>Catalog</Link>, 
        <Link href='/'>Progress</Link>,
        ];

    return(
        <>
            {profilePic && <Navbar 
              navItems={navItems} 
              navbarRef={nav}
              button={<button onClick={()=>router.push('/')} className={styles.alternateButton}>Upgrade</button>} 
              profilePic={profilePic} 
            />}
            
            <main className={styles.main}>
                <div>
                    <h1>Get Started</h1>
                    <div>
                        <h2>Recommended Courses</h2>
                        <CatalogImages
                            imageContainer={styles.imageContainer}
                            containerClass={styles.container}
                            hoverAnimation={{scale: 1.01, filter: "drop-shadow(0 0 0.75rem #18122B)"}}
                            hasDescription={true}
                            imageRefs={imageRefs}
                            fadeIn={fadeIn}
                            courses={courses}
                            targetLevel={"Introductory"}
                        />
                    </div>
                </div>
            </main>
        </>
    )
}
