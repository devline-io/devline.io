import TestCourse from "./test-course";
import {getStorage, getDownloadURL, ref} from "firebase/storage";
import { initFirebase } from "../../../components/firebase";

export default async function Page() {
    const outline = await getServerSideProps();
    console.log(outline)
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
    const outline = JSON.parse(JSON.stringify(await fetchOutline()));
    const chapters = [];
    const units = {};
    const lessons = {};
    for(let chapter = 0; chapter < outline.length; chapter++) {
        chapters.push(outline[''][`chapter${chapter+1}`].title);
        const currentChapter = chapters[chapter];
        units[currentChapter] = []
        for(let unit = 0; unit < outline[''][`chapter${chapter+1}`].length; unit++) {
            units[currentChapter].push(outline[''][`chapter${chapter+1}`][`unit${unit+1}`].title)
            const currentUnit = units[currentChapter][unit];
            lessons[currentChapter] = {};
            lessons[currentChapter][currentUnit] = [];
            for(let lesson = 0; lesson < outline[''][`chapter${chapter+1}`][`unit${unit+1}`].length; lesson++) {
                lessons[currentChapter][currentUnit].push(outline[''][`chapter${chapter+1}`][`unit${unit+1}`][`lesson${lesson+1}`].title)
            }
        }
    }

    return { chapters, units, lessons }
}