import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CatalogImages({ fadeIn, containerClass, imageContainer, hasDescription }) {
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
            <p>Learn how to creat a full stack web application</p>
        </section>,
        <section>
            <h2>Full Stack With React</h2>
            <hr/>
            <p>Learn how to creat a full stack web application</p>
        </section>,
        <section>
            <h2>Full Stack With React</h2>
            <hr/>
            <p>Learn how to creat a full stack web application</p>
        </section>,
        <section>
            <h2>Full Stack With React</h2>
            <hr/>
            <p>Learn how to creat a full stack web application</p>
        </section>,
        <section>
            <h2>Full Stack With React</h2>
            <hr/>
            <p>Learn how to creat a full stack web application</p>
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
            <motion.div className={containerClass} whileHover={{scale: 1.05}}>
                <div className={imageContainer} variants={fadeIn} key={thumbnail}>
                    <Image alt={thumbnail} src={thumbnail} fill sizes='25vw' />
                </div>
                {description[index]}
            </motion.div>
    ))
    );
}