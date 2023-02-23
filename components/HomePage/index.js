import Navbar from '../navbar'
import Head from 'next/head'
import styles from '../../styles/homepage.module.css'
import Darkdivider from '../darkdivider';
import Image from 'next/image'
import { motion } from 'framer-motion'

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
            <Image src={thumbnail} fill sizes='25vw' />
        </motion.div>
    ))
    );
}

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Devline.io</title>
            </Head>
            <Navbar/>
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
                    <motion.h2 variants={fadeIn}>./Catalog</motion.h2>
                    <motion.div className={styles.carousel} initial="hidden" whileInView="show" variants={container}>
                        <CatalogImages/>
                        <CatalogImages/>       
                    </motion.div>
                    <motion.button whileHover={{scale: 1.1,}} transition={{duration: 0.1}} variants={fadeIn} className={styles.lightButton}>See Full Catalog</motion.button>
                </motion.div>

                <Darkdivider dividerPosition='bottom'/>

                <motion.div className={styles.about} initial="hidden" whileInView="show" variants={container}>
                    <motion.h2 variants={fadeIn}>./About</motion.h2>
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
                <div className={styles.pricing}>
                    <h2>./Pricing</h2>
                    <section className={styles.pricingContainer}>
                        <div>
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
                        </div>
                        <div className={styles.featuredContainer}>
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
                            </div>
                        </div>
                        <div>
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
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}