import Image from 'next/image';
import styles from '../styles/divider.module.css'

export default function Darkdivider() {
    return (
        <div className={styles.divider}>
            <Image src='/dark-slant.svg' fill overflow='hidden'/>
        </div>
    );
}