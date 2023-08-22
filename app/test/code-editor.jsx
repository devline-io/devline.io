'use client'

import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import styles from '../../styles/editor.module.css';
import { usePython } from 'react-py';
import { ConsoleState } from 'react-py/dist/types/Console';

export default function CodeEditor() {
  const [code, setCode] = useState('');


  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  const handleChange = (value) => {
    setCode(value);
  }

  async function runCode() {
    await runPython(code);
  }


  return (
    <div className='noGlobal'>
      <div className={styles.wrapper} >
        <div className={styles.editor}>
          <Editor
            height='100%'
            width='100%'
            language='python'
            theme='vs-dark'
            defaultValue="# start your code here"
            onChange={handleChange}
            />
        </div>
        <div className={styles.compiler}>
          <button onClick={runCode}>Run &#9654;</button>
          <hr/>
          <pre className={styles.output}>
            {isLoading ? <code>Loading...</code> : <code>{'Welcome to the Devline.io python compiler powered by react-py\nPython 3.11.2 (main, Jul  7 2023 05:19:00) on WebAssembly/Emscripten\n'}</code>}
            <code>{stdout}</code>
            <code className={styles.errorMessage}>{stderr}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}