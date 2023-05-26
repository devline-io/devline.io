import Profile from "../../components/Profile/profile";
import { initFirebase } from "../../components/firebase";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getStorage, getDownloadURL } from "firebase/storage";

export default function Index({courses}) {
    return(
        <Profile courses={courses}/>
    );
}

export async function getServerSideProps() {
    initFirebase();
    const firestore = getFirestore();
    const storage = getStorage();
    
    const courses = [];
    const querySnapshot = await getDocs(collection(firestore, 'Courses'));

    querySnapshot.forEach((course) => {
        courses.push({name: course.id, data: course.data()});
    })

    for(const course in courses) {
        await getDownloadURL(ref(storage, `Courses/${courses[course].name}/thumbnail.png`))
        .then((image) => {
            courses[course].thumbnail = image;
        });
    }

    
    return {props: { courses }}
}