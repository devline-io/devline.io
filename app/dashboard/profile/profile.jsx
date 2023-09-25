'use client'

import Image from 'next/image';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'framer-motion';
import { initFirebase } from '../../../components/firebase';
import { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/profile.module.css';


export default function Profile() {

    initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if(user) {
            return;
        }
        if(!user && !loading) {
            console.log(user);
            router.push('/');
        }
    })

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
        </>
    );
}