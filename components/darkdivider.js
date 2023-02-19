import Image from 'next/image';
import styles from '../styles/divider.module.css'

export default function Darkdivider({ dividerPosition }) {
    return (
        <div className={styles[dividerPosition]}>
            <Image src='/dark-slant.svg' fill alt='divider' sizes='100vw' overflow='hidden'/>
        </div>
    );
}