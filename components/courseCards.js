import styles from '../styles/courseCards.module.css';

export default function courseCards({ courseName }) {
    return(
        <div className={styles.card}>
            <h3 className={styles.title}>{courseName}</h3>
        </div>
    );
}