import Dashboard from "./dashboard";
import { initFirebase } from "../../components/firebase";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default async function Page() {
    const data = await getServerSideProps();
    return(
        <Dashboard props={data}/>
    );
}

async function getServerSideProps() {
    initFirebase();
    const firestore = getFirestore();
    const storage = getStorage();
    
    const courses = [];
    const xp = {};
    const userData  = await getDocs(collection(firestore, 'User Data'));
    const querySnapshot = await getDocs(collection(firestore, 'Courses'));

    userData.forEach((user) => {
        xp[user.id] = user.data().xp;
    })

    querySnapshot.forEach((course) => {
        courses.push({name: course.id, data: course.data()});
    })

    for(const course in courses) {
        await getDownloadURL(ref(storage, `Courses/${courses[course].name}/thumbnail.png`))
        .then((image) => {
            courses[course].thumbnail = image;
        });
    }

    
    return {courses, xp};
}