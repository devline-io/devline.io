import Catalog from '../../components/Catalog/catalog';
import { initFirebase } from '../../components/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default function Index({courses}) {
    return(
        <Catalog courses={courses}/>
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
        await getDownloadURL(ref(storage, `Courses/${courses[course].name}/placeholderThumbnail1.png`))
        .then((image) => {
            courses[course].thumbnail = image;
        });
    }

    
    return {props: { courses }}
}