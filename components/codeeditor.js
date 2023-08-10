import { Editor } from "@monaco-editor/react";

export default function CodeEditor() {
    return (
      <Editor className="noGlobal" height='100vh' language='javascript' theme='vs-dark' defaultValue="console.log('Hello World!')"/>
    )
}