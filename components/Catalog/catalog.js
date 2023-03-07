import Navbar from '../../components/navbar';
import { useRouter } from 'next/router';
import CatalogImages from '../catalogimages';
import styles from '../../styles/catalog.module.css';

export default function Catalog() {
    const router = useRouter();
    return (
        <div>
            <Navbar home={() => router.push('/')} catalog={() => router.push('/#catalog')} about={() => router.push('/#about')} pricing={() => router.push('/#pricing')}/>
            <div className={styles.courseWrapper}>
                <CatalogImages imageContainer={styles.imageContainer} containerClass={styles.container}hasDescription={true}/>
            </div>
        </div>
    );
}