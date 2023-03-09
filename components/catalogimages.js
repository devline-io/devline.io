import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CatalogImages({ fadeIn, containerClass, imageContainer, hasDescription, hoverAnimation, imageRefs }) {
    const thumbnails = [
        '/thumbnails/placeholderThumbnail1.png',
        '/thumbnails/placeholderThumbnail2.png',
        '/thumbnails/placeholderThumbnail3.png',
        '/thumbnails/placeholderThumbnail4.png',
        '/thumbnails/placeholderThumbnail5.png'
    ];

    const description = [
        <section>
            <h2>Full Stack With React</h2>
            <hr/>
            <p>Learn how to create a full stack web application</p>
        </section>,
        <section>
            <h2>Full Stack With React</h2>
            <hr/>
            <p>Learn how to create a full stack web application</p>
        </section>,
        <section>
            <h2>Full Stack With React</h2>
            <hr/>
            <p>Learn how to create a full stack web application</p>
        </section>,
        <section>
            <h2>Full Stack With React</h2>
            <hr/>
            <p>Learn how to create a full stack web application</p>
        </section>,
        <section>
            <h2>Full Stack With React</h2>
            <hr/>
            <p>Learn how to create a full stack web application</p>
        </section>
    ]

    if(hasDescription == false) {
        return (
            thumbnails.map(thumbnail => (
            <motion.div className={containerClass} variants={fadeIn} key={thumbnail}>
                <Image alt={thumbnail} src={thumbnail} fill sizes='25vw' />
            </motion.div>
        ))
        );
    }

    return (
        thumbnails.map((thumbnail, index) => (
            <motion.div key={thumbnail} ref={imageRefs[index]} className={containerClass} initial={{filter: "0"}} whileHover={hoverAnimation} transition={{duration: 0.1, ease: "linear"}}>
                <div className={imageContainer} variants={fadeIn}>
                    <Image alt={thumbnail} src={thumbnail} fill sizes='25vw' />
                </div>
                {description[index]}
            </motion.div>
    ))
    );
}