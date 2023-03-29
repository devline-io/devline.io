import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase';
import { useState, useEffect } from 'react';
import styles from '../../styles/profile.module.css';
import Link from 'next/link';
import Navbar from '../navbar';
import CourseCards from '../courseCards';

export default function Profile() {
    initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    
    useEffect(() => {
        if(!user) {
            router.push('/')
        }
        if(user) {
            if(!user.displayName) {
                router.push('/profile/setup');
            } else {
                setUsername(user.displayName);
            }
        }
    })

    const navItems = [
        <Link href='/'>Home</Link>,
        <Link href='/'>Catalog</Link>, 
        <Link href='/'>Progress</Link>,
        <Link href='/'>Upgrade</Link>
        ];

    return(
        <>
            <Navbar navItems={navItems} button={<p>{username}</p>}/>
            <main className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.welcome_msg}>
                        <h1>Welcome {username}</h1>
                    </div>
                    <div className={styles.sign_out_btn}>
                        <button onClick={() => auth.signOut()}>Sign Out</button>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.cardContainer}>
                        <CourseCards courseName={"Course 1"}/>
                        <CourseCards courseName={"Course 2"}/>
                        <CourseCards courseName={"Course 3"}/>
                    </div>
                </div>
            </main>
        </>
    )
}