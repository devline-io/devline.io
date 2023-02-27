import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbar.module.css'

export default function Navbar(props) {
    const navItems = [
        <a onClick={props.catalog}>Catalog</a>, 
        <a onClick={props.about}>About</a>,
        <a onClick={props.pricing}>Pricing</a>
        ];

    return (
        <div ref={props.navbarRef} className={styles.wrapper}>
            <div className={styles.container}>
                <Image src='/images/logo.svg' width={217.851} height={37.501}/>
                <div className={styles.navLinks}>
                    <ul className={styles.navLinks}>
                        {navItems.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
    );
}