import Navbar from '../../components/navbar';
import { useRouter } from 'next/router';
import CatalogImages from '../catalogimages';
import styles from '../../styles/catalog.module.css';
import { useRef, useEffect } from 'react';
import Head from 'next/head'

export default function Catalog() {
    const router = useRouter();

    var imageRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ]

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
        <div>
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
                <div className={styles.title}>
                    <h1>Catalog</h1>
                    <h2>Engaging<span> project based</span> tutorials that teach through your choice of <span>written, video and interactive</span> formats</h2>
                    <hr/>
                </div>
                <div className={styles.courseWrapper}>
                    <CatalogImages
                        imageContainer={styles.imageContainer}
                        containerClass={styles.container}
                        hoverAnimation={{scale: 1.01, filter: "drop-shadow(0 0 0.75rem #18122B)"}}
                        hasDescription={true}
                        imageRefs = {imageRefs}
                    />
                </div>
            </main>
        </div>
    );
}