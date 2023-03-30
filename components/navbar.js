import { getAuth, signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRef } from 'react';
import styles from '../styles/navbar.module.css';
import { initFirebase } from './firebase';
import Link from 'next/link';

export default function Navbar(props) {
    initFirebase();
    const auth = getAuth();

    const profileMenu = useRef(null);
    const openProfileMenu = (e) => {
        e.preventDefault();
        profileMenu.current.style.display = 'block';
    }    

    const handleSignOut = () => {
        signOut(auth);
    }
    
    return (
        <div ref={props.navbarRef} className={styles.wrapper}>
            <div className={styles.container}>
                <Image src='/images/logo.svg' width={217.851} height={37.501}/>
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
                            <Link onClick={handleSignOut} href='/'>Sign Out</Link>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}
