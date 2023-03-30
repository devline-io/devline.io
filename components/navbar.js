import { getAuth } from 'firebase/auth';
import Image from 'next/image';
import { useRef } from 'react';
import styles from '../styles/navbar.module.css';
import { initFirebase } from './firebase';

export default function Navbar(props) {
    initFirebase();
    const auth = getAuth();

    const profileMenu = useRef(null);
    const openProfileMenu = (e) => {
        e.preventDefault();
        profileMenu.current.style.display = 'block';
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
                    <div className={styles.profileContainer}>
                        <Image onClick={openProfileMenu} src={props.profilePic} width={48} height={48}/>
                        <div ref={profileMenu} className={styles.profileMenu}>
                                <a onClick={() => console.log('signing out')}>Sign Out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
