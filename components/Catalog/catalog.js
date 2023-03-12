import Navbar from '../../components/navbar';
import { useRouter } from 'next/router';
import CatalogImages from '../catalogimages';
import styles from '../../styles/catalog.module.css';
import { useRef, useEffect } from 'react';
import Head from 'next/head'
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 1},
    show: {transition: {
            staggerChildren: .1
            }}
};

const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, 
            transition: {
            duration: .5,
            }}
};

export default function Catalog() {
    const router = useRouter();

    const imageRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    useEffect(() => {
        for (let index = 0; index < imageRefs.length; index++) {
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
    });

    return (
        <>
            <Head>
                <title>Devline.io | Catalog</title>
            </Head>

            <Navbar 
                    home={() => router.push('/')} 
                    catalog={() => router.push('/#catalog')}
                    about={() => router.push('/#about')} 
                    pricing={() => router.push('/#pricing')}
                />

            <main>
                <motion.div className={styles.title} initial="hidden" whileInView="show" variants={container}>
                    <motion.h1 variants={fadeIn}>Catalog</motion.h1>
                    <motion.h2 variants={fadeIn}>Engaging<span> project based</span> tutorials that teach through your choice of <span>written, video and interactive</span> formats</motion.h2>
                    <hr/>
                </motion.div>
                <div className={styles.courseWrapper}>
                    <CatalogImages
                        imageContainer={styles.imageContainer}
                        containerClass={styles.container}
                        hoverAnimation={{scale: 1.01, filter: "drop-shadow(0 0 0.75rem #18122B)"}}
                        hasDescription={true}
                        imageRefs={imageRefs}
                        fadeIn={fadeIn}
                    />
                </div>
            </main>
        </>
    );
}