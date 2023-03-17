import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import { useRouter } from 'next/router';

export default function Navbar(props) {
    const router = useRouter();

    const navItems = [
        <a ref={props.homeLink} onClick={props.home}>Home</a>,
        <a ref={props.catalogLink} onClick={props.catalog}>Catalog</a>, 
        <a ref={props.aboutLink} onClick={props.about}>About</a>,
        <a ref={props.pricingLink} onClick={props.pricing}>Pricing</a>
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
                    <button onClick={() => router.push('/login')}>Sign In</button>
                </div>
            </div>
        </div>
    );
}