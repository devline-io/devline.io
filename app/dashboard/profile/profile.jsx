'use client'

import Image from 'next/image';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'framer-motion';
import { initFirebase } from '../../../components/firebase';
import { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/profile.module.css';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


export default function Profile() {

    initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const [user, loading] = useAuthState(auth);
    const [startDate, setStartDate] = useState(null);
    const [xp, setXP] = useState(null);

    useEffect(() => {
        if (user) {
            const db = getFirestore();
            const userDocRef = doc(db, 'User Data', user.uid);

            getDoc(userDocRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        setStartDate(userData.startDate);
                        setXP(userData.xp);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });

            return;
        }
        if (!user && !loading) {
            console.log(user);
            router.push('/');
        }
    }, [user, router, loading]);

    return (
        <>
            <section className={styles.upperWrapper}>
                <div className={styles.upperContainer}>
                    <button onClick={()=>router.push('/dashboard')} className={styles.backButton}>Back</button>
                    <div className={styles.notificationBell}></div>
                </div>
            </section>

            <section className={styles.midWrapper}>
                <div className={styles.midContainer}>

                </div>
            </section>

            <div className={styles.divider}>
                
            </div>

            <main>
                <div className={styles.leftContainer}>
                    <p className={styles.name}>{user && user.displayName}</p>
                    <p className={styles.startDate}>Been Learning Since: {startDate && startDate}</p>
                    <p className={styles.xp}>Experience Points: {xp && xp}</p>
                </div>
            </main>
        </>
    );
}