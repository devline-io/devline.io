import { Editor } from "@monaco-editor/react";

export default function CodeEditor() {
    return (
      <section>
        <Editor height='100vh' language='javascript' theme='vs-dark' defaultValue="console.log('Hello World!')"/>
      </section>
    )
}