import Image from 'next/image';
import styles from '../styles/navbar.module.css';

export default function Navbar(props) {

    
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
                    {props.username}
                    {props.signout}
                </div>
            </div>
        </div>
    );
}
