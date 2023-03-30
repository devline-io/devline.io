import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase';
import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/profile.module.css';
import Link from 'next/link';
import Navbar from '../navbar';
import CourseCards from '../courseCards';

export default function Profile() {
    initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const nav = useRef(null);

    const [user, loading] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    
    useEffect(() => {
        if(user) {
            if(!user.displayName) {
                router.push('/profile/setup');
            } else {
                setUsername(user.displayName);
                setProfilePic(user.photoURL);
            }
        }
        if(!user && !loading) {
            console.log(user);
            router.push('/');
        }
    })

    const navItems = [
        <Link href='/'>Home</Link>,
        <Link href='/'>Catalog</Link>, 
        <Link href='/'>Progress</Link>,
        ];

    

    return(
        <>
            {profilePic && <Navbar 
              navItems={navItems} 
              navbarRef={nav}
              button={<button onClick={()=>router.push('/')} className={styles.alternateButton}>Upgrade</button>} 
              profilePic={profilePic} 
            />}
            
            <main className={styles.main}>
                <div className={styles.left}>
                    <div>
                        <h1>Welcome {username}</h1>
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