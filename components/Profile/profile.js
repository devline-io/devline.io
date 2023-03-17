import { auth } from '../firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Profile() {
    const router = useRouter();

    const user = auth.currentUser;
    return(
        <div>
            <h1>Welcome {user.displayName}</h1>
        </div>
    )
}