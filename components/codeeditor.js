import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import styles from '../styles/editor.module.css';

export default function CodeEditor() {
  const [code, setCode] = useState();

  const handleChange = (value) => {
    setCode(value);
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
            defaultValue="// start your code here"
            onChange={handleChange}
            />
        </div>
        <div className={styles.output}>
          <button>Run &#9654;</button>
          <hr/>
          <section>
            <code>test output</code>
          </section>
        </div>
      </div>
    </div>
  )
}