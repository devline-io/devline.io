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
import Image from 'next/image';

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

    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
          const {ctx} = chart;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = options.color || '#99ffff';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };

    useEffect(() => {
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
                    borderColor: "rgb(247, 239, 229)",
                    backgroundColor: "rgb(247, 239, 229)",
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    xAxes: [{gridLines: { color: "rgb(24, 18, 43)" }}],
                    yAxes: [{gridLines: { color: "rgb(247, 239, 229, 0.25)" }}]
                },
                plugins: {
                    customCanvasBackgroundColor: {
                        color: 'rgb(24, 18, 43)',
                    }
                }
            },
            plugins: plugin,
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
                <div className={styles.xp}>
                    <div className={styles.xpChart}>
                        <h2>Daily XP Gain</h2>
                        <canvas ref={barChart}></canvas>
                    </div>
                    <div className={styles.shop}>
                        <div className={styles.shopTitle}>
                            <h2>XP Shop</h2>
                            <h3>3000 XP</h3>
                        </div>
                        <hr/>
                        <div>
                            <div className={styles.shopItem}>
                                <p>Item 1</p>
                                <button className={styles.lightButton}>Purchase</button>
                            </div>
                            <hr/>
                            <div className={styles.shopItem}>
                                <p>Item 2</p>
                                <button className={styles.lightButton}>Purchase</button>
                            </div>
                            <hr/>
                            <div className={styles.shopItem}>
                                <p>Item 3</p>
                                <button className={styles.lightButton}>Purchase</button>
                            </div>
                            <hr/>
                            <div className={styles.shopItem}>
                                <p>Item 4</p>
                                <button className={styles.lightButton}>Purchase</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.continue}>
                    <h2>Continue</h2>
                    <div className={styles.courses}>
                        <CatalogImages courses={props.courses} fadeIn={fadeIn} hasDescription={false} imageRefs={imageRefs} targetLevel="Introductory" />
                    </div>
                    <div className={styles.arrows}>
                        <div className={styles.back}>
                            <Image src='/images/back.svg' fill/>
                        </div>
                        <div className={styles.next}>
                            <Image src='/images/next.svg' fill/>
                        </div>
                    </div>
                </div>
                
                <div className={styles.recommended}>
                    <h2>Recommended</h2>
                    <div className={styles.courses}>
                        <CatalogImages courses={props.courses} fadeIn={fadeIn} hasDescription={false} imageRefs={imageRefs} targetLevel="test" />
                    </div>
                </div>
            </main>
        </>
    )
}
