'use client'

import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import styles from '../../styles/editor.module.css';
import { usePythonConsole } from 'react-py';
import { ConsoleState } from 'react-py/dist/types/Console';

export default function CodeEditor() {
  const [code, setCode] = useState();
  const [output, setOutput] = useState('');


  const { runPython, stdout, stderr, isLoading, isRunning, banner, consoleState } = usePythonConsole();

  const handleChange = (value) => {
    setCode(value);
  }

  useEffect(() => {
    setOutput((prev) => [...prev, stdout])
  }, [stdout])

  useEffect(() => {
    setOutput((prev) => [...prev, stderr])
  }, [stderr])

  function getPrompt() {
    return consoleState === ConsoleState.incomplete ? '... ' : '>>> '
  }

  function run() {
    setOutput((prev) => [...prev, getPrompt() + 'python main.py' + '\n'])
    runPython(code)
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
        <div className={styles.output}>
          <button onClick={run}>Run &#9654;</button>
          <hr/>
          <pre>
            {banner}
            <br/>
            {output}
          </pre>
        </div>
      </div>
    </div>
  )
}