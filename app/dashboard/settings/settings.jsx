'use client'

import Image from 'next/image';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'framer-motion';
import { initFirebase } from '../../../components/firebase';
import { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/profile.module.css';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


export default function Profile() {

    return (
        <>
            <p>Settings Page</p>
        </>
    );
}