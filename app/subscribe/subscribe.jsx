'use client'

import {motion} from 'framer-motion';
import styles from '../../styles/homepage.module.css'
import { fadeIn, container } from '../homepage';

export default function Subscribe(){
    return (
        <motion.div className={styles.subscribe} initial="hidden" whileInView="show" variants={container}>
            <section className={styles.pricingContainer}>
                <motion.div variants={fadeIn} whileHover={{scale: 1.1}} transition={{duration: 0.3}}>
                    <h3>Free</h3>
                    <hr/>
                    <p>Free</p>
                    <hr/>
                    <ul>
                        <li>Full Access to All Courses</li>
                        <li className={styles.strikethrough}>Unlimited Daily Lessons</li>
                        <li className={styles.strikethrough}>Video Tutorials</li>
                        <li className={styles.strikethrough}>Project Based Learning</li>
                    </ul>
                    <button>Continue Free</button>
                </motion.div>
                <motion.div className={styles.featuredContainer} animate={{scale: 1.1}}variants={fadeIn} whileHover={{scale: 1.2}} transition={{duration: 0.3}}>
                    <div className={styles.featured}>
                        <h3>Yearly</h3>
                        <hr/>
                        <p>$99.99/year</p>
                        <hr/>
                        <ul>
                            <li>Full Access to All Courses</li>
                            <li>Unlimited Daily Lessons</li>
                            <li>Video Tutorials</li>
                            <li>Project Based Learning</li>
                        </ul>
                        <button>Subscribe Yearly</button>
                    </div>
                </motion.div>
                <motion.div variants={fadeIn} whileHover={{scale: 1.1}} transition={{duration: 0.3}}>
                    <h3>Monthly</h3>
                    <hr/>
                    <p>$9.99/month</p>
                    <hr/>
                    <ul>
                        <li>Full Access to All Courses</li>
                        <li>Unlimited Daily Lessons</li>
                        <li>Video Tutorials</li>
                        <li>Project Based Learning</li>
                    </ul>
                    <button>Subscribe Monthly</button>
                </motion.div>
            </section>
        </motion.div>
    )
}