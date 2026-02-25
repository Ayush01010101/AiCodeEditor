import { FC, useCallback, useEffect, useMemo, useState } from "react";
import getLangaugeExtension from "./LanguagesExtenstion";
import CodeMinimap from "./CodeMinimap";
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import useEditorstore from "./useEditorStore";
import { useGetfilebyid, useUpdatefile } from "../FileExplorer/useFiles";
import ThrottleRequest from "@/app/utlity/ThrottleRequest";
const CodeEditor: FC = () => {
  const { filedata } = useEditorstore((state) => state)
  const fileintialcontent = useGetfilebyid(filedata.fileid!)
  const updatefile = useUpdatefile()
  const extension = useMemo(() => getLangaugeExtension(filedata.filename ? filedata.filename : " "), [filedata])
  const [filecontent, setfilecontent] = useState<string | undefined>(fileintialcontent?.content)
  const minimap = CodeMinimap()
  useEffect(() => {
    setfilecontent("")
  }, [filedata.fileid])
  const throttledUpdateFile = useMemo(
    () => ThrottleRequest((value: string) => updatefile(value, filedata.fileid!), 4000),
    [filedata.fileid]
  )
  const handlechange = useCallback((value: string) => {
    throttledUpdateFile(value)
    setfilecontent(value)

  }, [throttledUpdateFile])
  return (
    <div className="p-2 mt-1 h-1/2 overflow-y-clip" >
      <CodeMirror value={filecontent} onChange={handlechange} content={filecontent} height="90vh" className="overflow-y-clip" extensions={[extension, minimap]} theme={oneDark} />
    </div >
  )
}

export default CodeEditor
