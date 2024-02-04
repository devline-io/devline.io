import TestCourse from "./test-course";
import {getStorage, getDownloadURL, ref, listAll} from "firebase/storage";
import { initFirebase } from "../../../components/firebase";
import { serialize } from 'next-mdx-remote/serialize'

export default async function Page() {
    const outline = await getServerSideProps();
    return (
        <TestCourse props={outline}/>
    )
}

async function fetchOutline() {
    return new Promise(async (resolve, reject) => {
        initFirebase();
        const storage = getStorage();
        const outlineRef = ref(storage, "Courses/Test Course/outline.json");

        try {
            const url = await getDownloadURL(outlineRef);
            const response = await fetch(url);
            const outline = await response.json();

            resolve(outline);
        } catch (error) {
            reject(error);
        }
    });
}

async function getServerSideProps() { 
    initFirebase()
    const storage = getStorage();
    const markdown = {};
    await listAll(ref(storage, "Courses/Test Course/Markdown")).then(async (res) => {
        res.items.forEach(async (item) => {
            const url = await getDownloadURL(item);
            const content = await fetch(url);
            const text = await content.text();
            markdown[item.name] = await serialize(text);
        })
    })

    const outline = JSON.parse(JSON.stringify(await fetchOutline()));
    const title = outline.title;
    const chapters = [];
    const units = {};
    const lessons = {};
    for(let chapter = 0; chapter < outline.length; chapter++) {
        chapters.push(outline[''][`chapter${chapter+1}`].title);
        const currentChapter = chapters[chapter];
        units[currentChapter] = []
        lessons[currentChapter] = {}
        for(let unit = 0; unit < outline[''][`chapter${chapter+1}`].length; unit++) {
            units[currentChapter].push(outline[''][`chapter${chapter+1}`][`unit${unit+1}`].title)
            const currentUnit = units[currentChapter][unit];
            lessons[currentChapter][currentUnit] = [];
            for(let lesson = 0; lesson < outline[''][`chapter${chapter+1}`][`unit${unit+1}`].length; lesson++) {
                lessons[currentChapter][currentUnit].push(outline[''][`chapter${chapter+1}`][`unit${unit+1}`][`lesson${lesson+1}`].title)
            }
        }
    }

    return { title, chapters, units, lessons, markdown }
}