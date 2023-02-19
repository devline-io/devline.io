import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbar.module.css'

const navItems = ['Catalog', 'About', 'Pricing'];

export default function Navbar() {
    return (
        <div className={styles.container}>
            <Image src='/logo.svg' width={217.851} height={37.501}/>
            <div className={styles.navLinks}>
                <ul className={styles.navLinks}>
                    {navItems.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
                <button>Sign Up</button>
            </div>
        </div>
    );
}