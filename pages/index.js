import Navbar from '../components/Navbar'
import Head from 'next/head'
import styles from '../styles/homepage.module.css'

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Devline.io</title>
      </Head>
      <Navbar/>
      <div>
        <h1 className={styles.tagline}>Learn to Code <span>SMARTER,</span><br/> Not <span>HARDER</span></h1>
      </div>
    </div>
  );
}