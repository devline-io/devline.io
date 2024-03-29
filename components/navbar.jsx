import { getAuth, signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from '../styles/navbar.module.css';
import { initFirebase } from './firebase';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

export default function Navbar(props) {
    initFirebase();
    const auth = getAuth();

    const [user] = useAuthState(auth);

    const router = useRouter();

    const profileMenu = useRef(null);
    const [menuToggle, setMenuToggle] = useState(true);

    const openProfileMenu = (e) => {
        e.preventDefault();
        if (menuToggle){
            profileMenu.current.style.display = 'block';
            setMenuToggle(false);
        }
        else {
            profileMenu.current.style.display = 'none';
            setMenuToggle(true);
        }
    }    

    const handleSignOut = () => {
        signOut(auth);
        router.push('/');
    }
    
    return (
        <div ref={props.navbarRef} className={styles.wrapper}>
            <div className={styles.container}>
                <Image onClick={() => router.push('/')} src='/images/logo.svg' width={217.851} height={37.501}/>
                <div className={styles.navLinks}>
                    <ul className={styles.navLinks}>
                        {props.navItems.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    {props.button}
                    {props.profilePic && <div className={styles.profileContainer}>
                        <Image onClick={openProfileMenu} src={props.profilePic} width={48} height={48}/>
                        <div ref={profileMenu} className={styles.profileMenu}>
                            <p>{user && user.displayName}</p>
                            <Link href='/dashboard'>Dashboard</Link>
                            <Link href='/dashboard/profile'>Profile</Link>
                            <Link href='/dashboard/settings'>Settings</Link>
                            <Link className={styles.signOutButton} onClick={handleSignOut} href='/'>Sign Out</Link>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}
