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
            console.error(error);
            reject(error);
        }
    });
}

async function getServerSideProps() { 
    const outline = JSON.parse(JSON.stringify(await fetchOutline()));
    const chapters = [];
    const units = [];
    const lessons = [];
    for(let chapter = 0; chapter < outline.length; chapter++) {
        chapters.push(outline[''][`chapter${chapter+1}`].title);
        for(let unit = 0; unit < outline[''][`chapter${chapter+1}`].length; unit++) {
            const currentChapter = chapters[chapter];
            units.push({[currentChapter]: outline[''][`chapter${chapter+1}`][`unit${unit+1}`].title})
            for(let lesson = 0; lesson < outline[''][`chapter${chapter+1}`][`unit${unit+1}`].length; lesson++) {
                const currentUnit = units[unit][`${currentChapter}`];
                lessons.push({[currentChapter]: {[currentUnit]: outline[''][`chapter${chapter+1}`][`unit${unit+1}`][`lesson${lesson+1}`].title}})
            }
        }
    }

    return { chapters, units, lessons }
}