'use client'

import { PythonProvider } from 'react-py';
import CodeEditor from './code-editor';

export default function Index() {
    return(
        <PythonProvider>
            <main>
                <CodeEditor/>
            </main>
        </PythonProvider>
        
    );
}