'use client'

import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'framer-motion';
import { initFirebase } from '../../../components/firebase';
import { useState, useEffect, useRef } from 'react';


export default function Profile() {

    initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if(user) {
            return;
        }
        if(!user && !loading) {
            console.log(user);
            router.push('/');
        }
    })

    return (
        <h1>Test</h1>
    );
}