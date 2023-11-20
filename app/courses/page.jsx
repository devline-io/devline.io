import { initFirebase } from '../../components/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Courses from './catalog';

export default async function Page() {
    const courses = await getServerSideProps();
    return(
        <Courses courses={courses}/>
    );
}

async function getServerSideProps() {
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

    
    return courses;
}