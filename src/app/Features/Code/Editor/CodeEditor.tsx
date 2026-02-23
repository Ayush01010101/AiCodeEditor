import { FC, useMemo } from "react";
import { useState, useCallback } from "react";
import getLangaugeExtension from "./LanguagesExtenstion";
import CodeMinimap from "./CodeMinimap";
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import useEditorstore from "./useEditorStore";
const CodeEditor: FC = () => {
  const [value, setValue] = useState("console.log('hello world!');");
  const { filedata } = useEditorstore((state) => state)
  const minimap = CodeMinimap()
  const extension = useMemo(() => getLangaugeExtension(filedata.filename ? filedata.filename : " "), [filedata])
  const onChange = useCallback((val, viewUpdate) => {
    setValue(val);
  }, []);
  return (
    <div className="p-2 mt-1 h-1/2 overflow-y-clip" >
      <CodeMirror value={value} height="90vh" className="overflow-y-clip" extensions={[extension, minimap]} onChange={onChange} theme={oneDark} />

    </div >
  )
}

export default CodeEditor
