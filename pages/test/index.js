'use client'

import { PythonProvider } from 'react-py';
import CodeEditor from '../../components/codeeditor';

export default function Index() {
    return(
        <PythonProvider>
            <CodeEditor/>
        </PythonProvider>
        
    );
}