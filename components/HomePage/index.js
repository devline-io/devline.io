import Navbar from '../navbar'
import Head from 'next/head'
import styles from '../../styles/homepage.module.css'
import Darkdivider from '../darkdivider'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

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

const fadeInFeatured = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, scale: 1.1,
            transition: {
            duration: .5,
            }}
}

function CatalogImages () {
    const thumbnails = [
        '/thumbnails/placeholderThumbnail1.png',
        '/thumbnails/placeholderThumbnail2.png',
        '/thumbnails/placeholderThumbnail3.png',
        '/thumbnails/placeholderThumbnail4.png',
        '/thumbnails/placeholderThumbnail5.png'
    ];

    return (
        thumbnails.map(thumbnail => (
        <motion.div variants={fadeIn} key={thumbnail}>
            <Image alt={thumbnail} src={thumbnail} fill sizes='25vw' />
        </motion.div>
    ))
    );
}

export default function HomePage() {
    const catalog = useRef(null);
    const about = useRef(null);
    const pricing = useRef(null);
    const nav = useRef(null);

    const scrollCatalog = () => {
        let position = catalog.current.offsetTop;
        let navHeight = nav.current.offsetHeight;
        window.scrollTo({behavior: 'smooth', top: position - navHeight});
    }
    const scrollAbout = () => {
        let position = about.current.offsetTop;
        let navHeight = nav.current.offsetHeight;
        window.scrollTo({behavior: 'smooth', top: position - navHeight});;
    }
    const scrollPricing = () => {
        let position = pricing.current.offsetTop;
        let navHeight = nav.current.offsetHeight;
        window.scrollTo({behavior: 'smooth', top: position - navHeight});
    }

    return (
        <div>
            <Head>
                <title>Devline.io</title>
            </Head>
            <Navbar navbarRef={nav} catalog={scrollCatalog} about={scrollAbout} pricing={scrollPricing}/>
            <main>
                <div className={styles.hero}>
                    <motion.div className={styles.titleContainer} initial="hidden" whileInView="show" variants={container}>
                    <motion.h1 variants={fadeIn} className={styles.title}>Code <span>SMARTER,</span><br/> Not <span>HARDER</span></motion.h1>
                    <motion.p variants={fadeIn} className={styles.subtitle}>Learn to code the <span>RIGHT WAY</span> with engaging, interactive tutorials</motion.p>
                    </motion.div>
                    <motion.form initial="hidden" whileInView="show" delay={0.5} variants={container}
                    className={styles.heroForm}>
                    <motion.div variants={fadeIn}>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email'/>
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password'/>
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <label htmlFor='confirm-password'>Confirm Your Password</label>
                        <input type='password' id='confirm-password'/>
                    </motion.div>
                    <motion.button variants={fadeIn}>Sign Up</motion.button>
                    </motion.form>
                </div>

                <Darkdivider dividerPosition='top'/>

                <motion.div className={styles.catalog} initial="hidden" whileInView="show" variants={container}>
                    <motion.h2 ref={catalog} variants={fadeIn}>./Catalog</motion.h2>
                    <motion.div className={styles.carousel} initial="hidden" whileInView="show" variants={container}>
                        <CatalogImages/>
                        <CatalogImages/>       
                    </motion.div>
                    <div className={styles.buttonContainer}>
                        <motion.button className={styles.lightButton} variants={fadeIn} whileHover={{scale: 1.1,}} transition={{duration: 0.1}}>See Full Catalog</motion.button>
                    </div>
                </motion.div>

                <Darkdivider dividerPosition='bottom'/>

                <motion.div className={styles.about} initial="hidden" whileInView="show" variants={container}>
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
                <motion.div className={styles.pricing} initial="hidden" whileInView="show" variants={container}>
                    <motion.h2 ref={pricing} variants={fadeIn}>./Pricing</motion.h2>
                    <section className={styles.pricingContainer}>
                        <motion.div variants={fadeIn}>
                            <h3>Free</h3>
                            <hr/>
                            <p>Free</p>
                            <hr/>
                            <ul>
                                <li>Limited Access to Courses</li>
                                <li className={styles.strikethrough}>Interactive Tutorials</li>
                                <li className={styles.strikethrough}>Written and Video Tutorials</li>
                                <li className={styles.strikethrough}>Project Based Learning</li>
                            </ul>
                            <button>Select</button>
                        </motion.div>
                        <motion.div className={styles.featuredContainer} variants={fadeInFeatured}>
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
                        <motion.div variants={fadeIn}>
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
        </div>
    );
}