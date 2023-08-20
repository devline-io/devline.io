import Image from 'next/image';
import styles from '../styles/divider.module.css';

export function BottomDivider() {
    return (
        <div className={styles.divider}>
            <Image src='/images/bottom-slant.svg' fill alt='divider' sizes='100vw' overflow='hidden'/>
        </div>
    );
}

export function TopDivider() {
    return (
        <div className={styles.divider}>
            <Image src='/images/top-slant.svg' fill alt='divider' sizes='100vw' overflow='hidden'/>
        </div>
    );
}