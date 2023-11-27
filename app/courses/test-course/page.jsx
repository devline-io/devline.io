import TestCourse from "./test-course";
import {getStorage, getDownloadURL, ref} from "firebase/storage";
import { initFirebase } from "../../../components/firebase";

export default async function Page() {
    const outline = await getServerSideProps();
    return (
        <TestCourse jsonOutline={outline}/>
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
            const outline = await response.json(); // Assuming your outline is a JSON file

            resolve(outline);
        } catch (error) {
            console.error(error);
            reject(error); // Reject the promise in case of an error
        }
    });
}

async function getServerSideProps() {
    return await fetchOutline();  
}