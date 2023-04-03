import Navbar from '../navbar';
import Head from 'next/head';
import styles from '../../styles/homepage.module.css';
import Darkdivider from '../darkdivider';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import CatalogImages from '../catalogimages';
import Register from '../Authentication/register'

export const container = {
    hidden: { opacity: 1},
    show: {transition: {
            staggerChildren: .1
            }}
};

export const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, 
            transition: {
            duration: .5,
            }}
};

export default function HomePage() {
    const router = useRouter();

    const catalog = useRef(null);
    const about = useRef(null);
    const pricing = useRef(null);

    const nav = useRef(null);
    const navHome = useRef(null);
    const navCatalog = useRef(null);
    const navAbout = useRef(null);
    const navPricing = useRef(null);

    const scrollHome = () => {
        window.scrollTo({behavior: 'smooth', top: 0});
    }

    const scrollCatalog = () => {
        let position = catalog.current.offsetTop;
        let navHeight = nav.current.offsetHeight;
        window.scrollTo({behavior: 'smooth', top: (position - navHeight) * getComputedStyle(document.querySelector('html')).zoom});
    }
    const scrollAbout = () => {
        let position = about.current.offsetTop;
        let navHeight = nav.current.offsetHeight;
        window.scrollTo({behavior: 'smooth', top: (position - navHeight) * getComputedStyle(document.querySelector('html')).zoom});
    }
    const scrollPricing = () => {
        let position = pricing.current.offsetTop;
        let navHeight = nav.current.offsetHeight;
        window.scrollTo({behavior: 'smooth', top: (position - navHeight) * getComputedStyle(document.querySelector('html')).zoom});
    }

    const navItems = [
        <a ref={navHome} onClick={scrollHome}>Home</a>,
        <a ref={navCatalog} onClick={scrollCatalog}>Catalog</a>, 
        <a ref={navAbout} onClick={scrollAbout}>About</a>,
        <a ref={navPricing} onClick={scrollPricing}>Pricing</a>
        ];

    return (
        <>
            <Head>
                <title>Devline.io</title>
                <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
            </Head>
            <Navbar navItems={navItems} navbarRef={nav} button={<button onClick={() => router.push('/login')}>Sign In</button>}/>
            <main>
                <div id='home'className={styles.hero}>
                    <motion.div className={styles.titleContainer} initial="hidden" whileInView="show" variants={container}>
                        <motion.h1 variants={fadeIn} className={styles.title}>Code <span>SMARTER,</span><br/> Not <span>HARDER</span></motion.h1>
                        <motion.p variants={fadeIn} className={styles.subtitle}>Learn to code the <span>RIGHT WAY</span> with engaging, interactive tutorials</motion.p>
                    </motion.div>

                    <Register darkForm={false}/>
                </div>

                <Darkdivider dividerPosition='top'/>

                <motion.div id='catalog' className={styles.catalog} initial="hidden" whileInView="show" variants={container}>
                    <motion.h2 ref={catalog} variants={fadeIn}>./Catalog</motion.h2>
                    <motion.div>
                        <motion.div className={styles.carousel} initial="hidden" whileInView="show" variants={container}>
                            <CatalogImages fadeIn={fadeIn} hasDescription={false} />
                            <CatalogImages fadeIn={fadeIn} hasDescription={false} />
                        </motion.div>
                    </motion.div>
                    <div className={styles.buttonContainer}>
                        <motion.button onClick={() => router.push('/catalog/')} className={styles.lightButton} variants={fadeIn} whileHover={{scale: 1.1}} transition={{duration: 0.1}}>See Full Catalog</motion.button>
                    </div>
                </motion.div>

                <Darkdivider dividerPosition='bottom'/>

                <motion.div id='about'className={styles.about} initial="hidden" whileInView="show" variants={container}>
                    <motion.h2 ref={about} variants={fadeIn}>./About</motion.h2>
                    <div className={styles.aboutContent}>
                        <div className={styles.mission}>
                        <motion.h3 variants={fadeIn}>Our Mission</motion.h3>
                        <motion.p variants={fadeIn}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit. Ut eu sem integer vitae. At tempor commodo ullamcorper a lacus vestibulum. Tincidunt praesent semper feugiat nibh sed.</motion.p>
                        </div>
                        <div className={styles.verticalRule}/>
                        <div className={styles.structure}>
                        <motion.h3 variants={fadeIn}>Course Structure</motion.h3>
                        <motion.p variants={fadeIn}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit. Ut eu sem integer vitae. At tempor commodo ullamcorper a lacus vestibulum. Tincidunt praesent semper feugiat nibh sed.</motion.p>
                        </div>
                    </div>
                </motion.div>

                <Darkdivider dividerPosition='top'/>
                <motion.div id='pricing' className={styles.pricing} initial="hidden" whileInView="show" variants={container}>
                    <motion.h2 ref={pricing} variants={fadeIn}>./Pricing</motion.h2>
                    <section className={styles.pricingContainer}>
                        <motion.div variants={fadeIn} whileHover={{scale: 1.1}} transition={{duration: 0.3}}>
                            <h3>Free</h3>
                            <hr/>
                            <p>Free</p>
                            <hr/>
                            <ul>
                                <li>Full Access to All Courses</li>
                                <li className={styles.strikethrough}>Interactive Tutorials</li>
                                <li className={styles.strikethrough}>Written and Video Tutorials</li>
                                <li className={styles.strikethrough}>Project Based Learning</li>
                            </ul>
                            <button>Select</button>
                        </motion.div>
                        <motion.div className={styles.featuredContainer} animate={{scale: 1.1}}variants={fadeIn} whileHover={{scale: 1.2}} transition={{duration: 0.3}}>
                            <div className={styles.featured}>
                                <h3>Yearly</h3>
                                <hr/>
                                <p>$99.99/year</p>
                                <hr/>
                                <ul>
                                    <li>Full Access to All Courses</li>
                                    <li>Interactive Tutorials</li>
                                    <li>Written and Video Tutorials</li>
                                    <li>Project Based Learning</li>
                                </ul>
                                <button>Select</button>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeIn} whileHover={{scale: 1.1}} transition={{duration: 0.3}}>
                            <h3>Monthly</h3>
                            <hr/>
                            <p>$9.99/month</p>
                            <hr/>
                            <ul>
                                <li>Full Access to All Courses</li>
                                <li>Interactive Tutorials</li>
                                <li>Written and Video Tutorials</li>
                                <li>Project Based Learning</li>
                            </ul>
                            <button>Select</button>
                        </motion.div>
                    </section>
                </motion.div>
            </main>
        </>
    );
}
