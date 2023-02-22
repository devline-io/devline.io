import Navbar from '../components/navbar'
import Head from 'next/head'
import styles from '../styles/homepage.module.css'
import Darkdivider from '../components/darkdivider';
import Image from 'next/image'
import { motion } from 'framer-motion'

const thumbnails = [
  '/thumbnails/placeholderThumbnail1.png',
  '/thumbnails/placeholderThumbnail2.png',
  '/thumbnails/placeholderThumbnail3.png',
  '/thumbnails/placeholderThumbnail4.png',
  '/thumbnails/placeholderThumbnail5.png'
];

const container = {
  hidden: { opacity: 0, y: 15},
  show: { opacity: 1, y: 0, 
          transition: {
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
        
        <div className={styles.catalog}>
          <h2>./Catalog</h2>
          <div className={styles.carousel}>
            {thumbnails.map(thumbnail => (
              <div key={thumbnail}>
                <Image src={thumbnail} fill sizes='25vw'/>
              </div>
            ))}
            {thumbnails.map(thumbnail => (
              <div key={thumbnail}>
                <Image src={thumbnail} fill sizes='25vw' />
              </div>
            ))}
          </div>
          <button className={styles.lightButton}>See Full Catalog</button>
        </div>

        <Darkdivider dividerPosition='bottom'/>

        <motion.div className={styles.about} initial="hidden" whileInView="show" variants={container}>
          <motion.h2 variants={fadeIn}>./About</motion.h2>
          <div className={styles.aboutContent}>
            <div className={styles.mission}>
              <motion.h3 variants={fadeIn}>Our Mission</motion.h3>
              <motion.p variants={fadeIn}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit. Ut eu sem integer vitae. At tempor commodo ullamcorper a lacus vestibulum. Tincidunt praesent semper feugiat nibh sed.</motion.p>
            </div>
            <motion.div className={styles.about} initial="hidden" whileInView="show" variants={container} className={styles.verticalRule}/>
            <div className={styles.structure}>
              <motion.h3 variants={fadeIn}>Course Structure</motion.h3>
              <motion.p variants={fadeIn}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit. Ut eu sem integer vitae. At tempor commodo ullamcorper a lacus vestibulum. Tincidunt praesent semper feugiat nibh sed.</motion.p>
            </div>
          </div>
        </motion.div>
        <Darkdivider dividerPosition='top'/>
        <div className={styles.pricing}>
          <h2>./Pricing</h2>
        </div>
      </main>
    </div>
  );
}