import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function CatalogImages({ courses, fadeIn, containerClass, imageContainer, hasDescription, hoverAnimation, imageRefs }) {    
    const thumbnails = [
        '/thumbnails/placeholderThumbnail1.png',
        '/thumbnails/placeholderThumbnail2.png',
        '/thumbnails/placeholderThumbnail3.png',
        '/thumbnails/placeholderThumbnail4.png',
        '/thumbnails/placeholderThumbnail5.png'
    ];

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
            thumbnails.map(thumbnail => (
            <motion.div className={containerClass} variants={fadeIn} key={thumbnail}>
                <Image alt={thumbnail} src={thumbnail} fill sizes='25vw' />
            </motion.div>
        ))
        );
    }
    console.log(courses);
    courses.map(course => {
        console.log(course.name)
    })
    
    return (
        courses.map((course, index) => (
            <motion.div key={course}
             variants={fadeIn} 
             initial={{opacity: 0, y: 15, filter: 'none'}} 
             whileInView="show" 
             onClick={thumbnailPage[index]} 
             // ref={imageRefs[index]} 
             className={containerClass} 
             whileHover={hoverAnimation}
             transition={{duration: 0.1, ease: "linear"}}>
                <div className={imageContainer}>
                    <Image alt={course} src={course.thumbnail} fill sizes='25vw' />
                </div>
                <h3>{course.name}</h3>
                <p>{course.data.description}</p>
            </motion.div>
        ))
    );
}