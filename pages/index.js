import Navbar from '../components/navbar'
import Head from 'next/head'
import styles from '../styles/homepage.module.css'
import Darkdivider from '../components/darkdivider';
import Image from 'next/image'

let thumbnails = [
  '/thumbnails/placeholderThumbnail1.png',
  '/thumbnails/placeholderThumbnail2.png',
  '/thumbnails/placeholderThumbnail3.png',
  '/thumbnails/placeholderThumbnail4.png',
  '/thumbnails/placeholderThumbnail5.png'
]

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Devline.io</title>
      </Head>
      <Navbar/>
      <div className={styles.hero}>
        <div>
          <h1 className={styles.title}>Code <span>SMARTER,</span><br/> Not <span>HARDER</span></h1>
          <p className={styles.subtitle}>Learn to code the <span>RIGHT WAY</span> with engaging, interactive tutorials</p>
        </div>
        <form className={styles.heroForm}>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email'/>
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password'/>
          </div>
          <div>
            <label htmlFor='confirm-password'>Confirm Your Password</label>
            <input type='password' id='confirm-password'/>
          </div>
          <button>Sign Up</button>
        </form>
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

      <div className={styles.about}>
        <h2>./About</h2>
        <div className={styles.aboutContent}>
          <div className={styles.mission}>
            <h3>Our Mission</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit. Ut eu sem integer vitae. At tempor commodo ullamcorper a lacus vestibulum. Tincidunt praesent semper feugiat nibh sed.</p>
          </div>
          <div className={styles.structure}>
            <h3>Course Structure</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit. Ut eu sem integer vitae. At tempor commodo ullamcorper a lacus vestibulum. Tincidunt praesent semper feugiat nibh sed.</p>
          </div>
        </div>
      </div>

      <Darkdivider dividerPosition='top'/>

      <div className={styles.pricing}>
        <h2>./Pricing</h2>
      </div>
    </div>
  );
}