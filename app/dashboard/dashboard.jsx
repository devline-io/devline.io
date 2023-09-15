'use client'

import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'framer-motion';
import { initFirebase } from '../../components/firebase';
import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/dashboard.module.css';
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
                router.push('/dashboard/setup');
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
                <div className={styles.header}>
                    <h1>Dashboard</h1>
                </div>
                <div className={styles.container}>
                    <div className={styles.leftContent}>
                        <div className={styles.topRow}>
                            <div className={styles.currentStreak}>
                                <h3>Curent Streak</h3>
                                <div className={styles.weekCal}>
                                    <p>Calender placeholder. Want to put a week calander here Sunday - Saturday that will track each time you log in. If complete the week logging in every day you get some kind of reward </p>
                                </div>
                            </div>
                            <div className={styles.lessonEnergy}>
                                <h3>Lesson Energy</h3>
                                <div className={styles.energyBar}>
                                    <p>Simply just showing how much energy you have for the rest of the day</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.recentCourses}>
                            <h3>Recent Courses</h3>
                            <div className={styles.courses}>
                                
                            </div>
                        </div>
                    </div>
                    <div className={styles.myProjects}>
                        <h3>My Projects</h3>
                        <div className={styles.projects}>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
