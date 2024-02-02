'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../../../components/navbar";
import { useRef, useState, useEffect } from "react";
import { initFirebase } from "../../../components/firebase";
import { getAuth } from "firebase/auth";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import styles from '../../../styles/courses.module.css';
import { MDXRemote } from 'next-mdx-remote'
import SmoothScroll from "../../../components/smooth-scroll";

export default function TestCourse({props}) {
    initFirebase();
    const auth = getAuth()

    const router = useRouter();

    const nav = useRef(null);

    const [user, loading] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    const courseRefs = {};
    const [currentChapter, setCurrentChapter] = useState(1);
    const [currentUnit, setCurrentUnit] = useState(1);

    const [markdown, setMarkdown] = useState(props.markdown['C1U1.md']);

    for(let chapter = 1; chapter <= props.chapters.length; chapter++) {
        courseRefs[`c${chapter}`] = useRef(null);
        for(let unit = 1; unit <= props.units[props.chapters[chapter-1]].length; unit++) {
            courseRefs[`c${chapter}u${unit}`] = useRef(null);
            for(let lesson = 1; lesson <= props.lessons[props.chapters[chapter-1]][props.units[props.chapters[chapter-1]][unit-1]].length; lesson++) {
                courseRefs[`c${chapter}u${unit}l${lesson}`] = useRef(null);
            }
        }
    }

    useEffect(() => {
        if(user) {
            if(!user.displayName || !user.photoURL) {
                router.push('/dashboard/setup');
            } else {
                setUsername(user.displayName);
                setProfilePic(user.photoURL);
            }
        }
        if(!user && !loading) {
            console.log(user);
            router.push('/sign-up/?nextPath=courses/test-course');
        }

    })

    const nextPage =  () => {
        const unitLength = props.units[props.chapters[currentChapter-1]].length;
        console.log(currentUnit, currentChapter, currentUnit == unitLength)
        if(currentUnit == unitLength) {
            setCurrentUnit(1);
            if(currentChapter == props.chapters.length) {
                setCurrentChapter(1);
            } else {
                setCurrentChapter(currentChapter + 1);
            }
        } else {
            setCurrentUnit(currentUnit + 1);
        }
        setMarkdown(props.markdown[`C${currentChapter}U${currentUnit}.md`])
        window.scrollTo({behavior: 'smooth', top: 0});
    }

    const handleLessonClick = async (scrollItem, page) => {
        setMarkdown(props.markdown[`C1U${page}.md`]);
        await courseRefs[scrollItem] != null;
        SmoothScroll(courseRefs[scrollItem], nav);
    }
    

    const navItems = [
        <Link href='/'>Home</Link>,
        <Link href='/courses'>Catalog</Link>, 
        <Link href='/'>Progress</Link>,
        ];

    return (
        <>
            {profilePic && <Navbar 
              navItems={navItems} 
              navbarRef={nav}
              button={<button onClick={()=>router.push('/')} className={styles.alternateButton}>Upgrade</button>} 
              profilePic={profilePic} 
            />}
            <div className={styles.course}>
                <ul className={styles.outline}>
                    {props.chapters.map((chapter) => {
                        return (
                            <li>
                                {chapter}
                                <ul>
                                    {props.units[chapter].map((unit, uIndex) => {
                                        return (
                                            <li className={styles.outlineItems}>
                                                <a onClick={() => handleLessonClick(`c1u${uIndex+1}`, uIndex + 1)}>{unit}</a>
                                                <ul>
                                                    {props.lessons[chapter][unit].map((lesson,lIndex) => {
                                                        return <li className={styles.outlineItems}><a onClick={() => handleLessonClick(`c1u${uIndex+1}l${lIndex+1}`, uIndex + 1)}>{lesson}</a></li>
                                                        
                                                    })}
                                                </ul>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>)
                    })}
                </ul>
                <div className={styles.courseText}>
                    {markdown && <MDXRemote {...markdown} scope={courseRefs}/>}
                </div>
            </div>
            <div className={styles.nextBackButton}>
                <button>Back</button>
                <button onClick={nextPage}>Next</button> 
            </div>
        </>
    )
}