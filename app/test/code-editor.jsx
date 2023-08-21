'use client'

import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import styles from '../../styles/editor.module.css';
import { usePythonConsole } from 'react-py';
import { ConsoleState } from 'react-py/dist/types/Console';

export default function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState([]);


  const { runPython, stdout, stderr, isLoading, isRunning, banner, consoleState } = usePythonConsole();

  const handleChange = (value) => {
    setCode(value);
  }

  useEffect(() => {
    stdout && setOutput((prev) => [...prev, {text: stdout}]);
  }, [stdout])

  useEffect(() => {
    stderr && setOutput((prev) => [...prev, {text: stderr + '\n', className: `${styles.errorMessage}`}]);
  }, [stderr])

  function getPrompt() {
    return consoleState === ConsoleState.incomplete ? '... ' : '>>> ';
  }

  function runCode() {
    setOutput([]);
    setOutput((prev) => [...prev, {text: getPrompt() + 'python main.py' + '\n'}]);
    runPython(code);
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
            {isLoading ? <code>Loading...</code> : null}
            {banner}
            <br/>
            {output.map((line, i) => (
              <code className={line.className} key={i}>
                {line.text}
              </code>
            ))}
            {isLoading ? null: getPrompt()}
          </pre>
        </div>
      </div>
    </div>
  )
}