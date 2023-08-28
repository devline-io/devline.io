'use client'

import { useState, useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import styles from '../../styles/editor.module.css';
import { usePython } from 'react-py';

export default function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState([]);
  const [isTerminal, setIsTerminal] = useState(false);
  const [prompt, setPrompt] = useState(null);

  const terminalInput = useRef(null);

  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  useEffect(() => {
    if(isTerminal) {
      stdout && setOutput((prev) => prev.concat(<code>{stdout}</code>));
    } else {
      stdout && setOutput(<code>{stdout}</code>);
    }
  },[stdout])

  useEffect(() => {
    stderr && setOutput((prev) => prev.concat(<code className={styles.errorMessage}>{stderr}</code>));
  },[stderr])

  function onKeyPress(e) {
    if(e.key == 'Enter') {
      setOutput(<code>{'>>> ' + terminalInput.current.value}</code>);
      setIsTerminal(true);
      runPython(terminalInput.current.value);
      terminalInput.current.value = '';
    }
  }

  const handleChange = (value) => {
    setCode(value);
  }

  function runCode() {
    setOutput(null);
    setIsTerminal(false);
    setPrompt(<code>{'>>> python main.py\n'}</code>);
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
            {isLoading ? <code>Loading...</code> : <code className={styles.banner}>
              Welcome to the Devline.io python compiler powered by <strong>react-py</strong><br/>Python 3.11.2 on WebAssembly/Emscripten<br/>
              </code>}
            <br/>
            {prompt && <code>{prompt}</code>}
            {output && <code>{output}</code>}
            <pre className={styles.terminal}>
              {!isLoading && <code>{'>>> '}<input ref={terminalInput} onKeyPress={(e) => onKeyPress(e)}/></code>}
            </pre>
          </pre>
        </div>
      </div>
    </div>
  )
}