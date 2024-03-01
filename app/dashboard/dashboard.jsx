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
import CatalogImages from '../../components/catalog-images';
import { container, fadeIn } from '../homepage';
import { Chart } from 'chart.js';

export default function Dashboard({props}) {
    initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const nav = useRef(null);

    const [user, loading] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    const barChart = useRef(null);

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


        if(user) {
            var uid = user.uid
        }
        
        const xp = props.xp[uid];

        var myChart = new Chart(barChart.current.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [{
                    data: xp,
                    label: "Points",
                    borderColor: "rgb(109, 253, 181)",
                    backgroundColor: "rgb(109, 253, 181,0.5)",
                    borderWidth: 2
                }]
            },
        });

        if(user) {
            if(!user.displayName || !user.photoURL) {
                router.push('/dashboard/setup');
            } else {
                setUsername(user.displayName);
                setProfilePic(user.photoURL);
            }
        }
        if(!user && !loading) {
            router.push('/');
        }
    })

    const navItems = [
        <Link href='/'>Home</Link>,
        <Link href='/courses'>Catalog</Link>, 
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
                <h1>Bar Chart</h1>
                <div>
                    <div>
                        <canvas ref={barChart}></canvas>
                    </div>
                </div>
            </main>
        </>
    )
}
