import Navbar from '../components/navbar'
import Head from 'next/head'
import styles from '../styles/homepage.module.css'
import Darkdivider from '../components/darkdivider';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Devline.io</title>
      </Head>
      <Navbar/>
      <div className={styles.hero}>
        <div>
          <h1 className={styles.tagline}>Code <span>SMARTER,</span><br/> Not <span>HARDER</span></h1>
          <p className={styles.subtagline}>Learn to code the <span>RIGHT WAY</span> with engaging, interactive tutorials</p>
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
      <Darkdivider/>
      <div className={styles.catalog}>
        <h2>./Catalog</h2>
      </div>
    </div>
  );
}