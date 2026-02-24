import { FC, useMemo } from "react";
import { useState, useCallback, useEffect } from "react";
import getLangaugeExtension from "./LanguagesExtenstion";
import CodeMinimap from "./CodeMinimap";
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { useGetfilebyid, useUpdatefile } from "../FileExplorer/useFiles";
import useEditorstore from "./useEditorStore";
const CodeEditor: FC = () => {
  const [filecontent, setfilecontent] = useState<string | undefined>("")
  const { filedata } = useEditorstore((state) => state)
  const filecontentdata = useGetfilebyid(filedata.fileid!)
  console.log(filecontentdata)
  const minimap = CodeMinimap()
  const extension = useMemo(() => getLangaugeExtension(filedata.filename ? filedata.filename : " "), [filedata])
  return (
    <div className="p-2 mt-1 h-1/2 overflow-y-clip" >
      <CodeMirror readOnly={true} value={filecontentdata?.content} height="90vh" className="overflow-y-clip" extensions={[extension, minimap]} theme={oneDark} />
    </div >
  )
}

export default CodeEditor
