'use client'

import Navbar from '../../components/navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CatalogImages from '../../components/catalogimages';
import styles from '../../styles/catalog.module.css';
import { useRef, useEffect } from 'react';
import Head from 'next/head'
import { motion } from 'framer-motion';
import { container, fadeIn } from '../homepage';
import { initFirebase } from '../../components/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

export default function Catalog({courses}) {
    initFirebase();
    const auth = getAuth();

    const [user] = useAuthState(auth);

    const router = useRouter();

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

    const navItems = [
        <Link href='/'>Home</Link>,
        <Link href='/#catalog'>Catalog</Link>, 
        <Link href='/#about'>About</Link>,
        <Link href='/#pricing'>Pricing</Link>
        ];

    return (
        <>
            <Head>
                <title>Devline.io | Catalog</title>
            </Head>

            <Navbar navItems={navItems} button={!user && <button onClick={() => router.push('/sign-in')}>Sign In</button>} profilePic={user && user.photoURL}/>

            <main>
                <motion.div className={styles.title} initial="hidden" whileInView="show" variants={container}>
                    <motion.h1 variants={fadeIn}>Catalog</motion.h1>
                    <motion.h2 variants={fadeIn}>Engaging<span> project based</span> tutorials that teach through your choice of <span>written, video and interactive</span> formats</motion.h2>
                    <hr/>
                </motion.div>
                <CatalogImages
                        imageContainer={styles.imageContainer}
                        containerClass={styles.container}
                        hoverAnimation={{scale: 1.01, filter: "drop-shadow(0 0 0.75rem #18122B)"}}
                        hasDescription={true}
                        imageRefs={imageRefs}
                        fadeIn={fadeIn}
                        courses={courses}
                />
            </main>
        </>
    );
}