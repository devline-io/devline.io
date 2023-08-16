import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/catalog.module.css';

export default function CatalogImages({ courses, fadeIn, containerClass, imageContainer, hasDescription, hoverAnimation, imageRefs, targetLevel}) {    

    const router = useRouter();
    const thumbnailPage = [
        () => router.push('/catalog/placeholderLesson'),
        () => router.push('/catalog/placeholderLesson'),
        () => router.push('/catalog/placeholderLesson'),
        () => router.push('/catalog/placeholderLesson'),
        () => router.push('/catalog/placeholderLesson')
    ];

    if(hasDescription == false) {
        return (
            courses.map((course, index) => (
                <motion.div className={containerClass} variants={fadeIn} key={course.thumbnail + index}>
                    <Image alt={course} src={course.thumbnail} fill sizes='25vw' />
                </motion.div>
            ))
        );
    }

    if(targetLevel != null) {
        return(
            <div className={styles.courseWrapper}>
                {courses.map((course, index) => (
                    course.data.level == targetLevel && (
                        <motion.div key={course + index}
                        variants={fadeIn} 
                        initial={{opacity: 0, y: 15, filter: 'none'}} 
                        whileInView="show" 
                        onClick={thumbnailPage[index]} 
                        ref={imageRefs[index]} 
                        className={containerClass} 
                        whileHover={hoverAnimation}
                        transition={{duration: 0.1, ease: "linear"}}>
                            <div className={styles.imageContainer}>
                                <Image alt={course} src={course.thumbnail} fill sizes='25vw' />
                            </div>
                            <h3>{course.name}</h3>
                            <p>Level: {course.data.level}</p>
                            <p>{course.data.description}</p>
                        </motion.div>
                    )
                ))}
            </div>
        )
    }

    return (
        <div className={styles.courseWrapper}>
            {courses.map((course, index) => (
                <motion.div key={course + index}
                variants={fadeIn} 
                initial={{opacity: 0, y: 15, filter: 'none'}} 
                whileInView="show" 
                onClick={thumbnailPage[index]} 
                ref={imageRefs[index]} 
                className={containerClass} 
                whileHover={hoverAnimation}
                transition={{duration: 0.1, ease: "linear"}}>
                    <div className={styles.imageContainer}>
                        <Image alt={course} src={course.thumbnail} fill sizes='25vw' />
                    </div>
                    <h3>{course.name}</h3>
                    <p>Level: {course.data.level}</p>
                    <hr/>
                    <p>{course.data.description}</p>
                </motion.div>
            ))}
        </div>
    );
}