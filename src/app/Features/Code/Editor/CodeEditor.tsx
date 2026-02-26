import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { selectSuggestion } from "./Extensions/Suggestions/Selectsuggestion";
import suggestion from "./Extensions/Suggestions";
import getLangaugeExtension from "./Extensions/LanguagesExtenstion";
import CodeMinimap from "./Extensions/CodeMinimap";
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import useEditorstore from "./useEditorStore";
import { useUpdatefile } from "../FileExplorer/useFiles";
import ThrottleRequest from "@/app/utlity/ThrottleRequest";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

const CodeEditor: FC = () => {
  const { filedata } = useEditorstore((state) => state)
  const fileId = filedata.fileid;
  const fileFromDb = useQuery(
    api.files.getFilebyId,
    fileId ? { id: fileId } : "skip"
  );
  const updatefile = useUpdatefile()
  const extension = useMemo(
    () => getLangaugeExtension(filedata.filename ? filedata.filename : " "),
    [filedata.filename]
  )
  const minimap = useMemo(() => CodeMinimap(), [])
  const [filecontent, setfilecontent] = useState<string | undefined>(undefined)
  const hydratedForFileIdRef = useRef<typeof fileId>(undefined);
  const fileIdRef = useRef<typeof fileId>(fileId);
  const updatefileRef = useRef(updatefile);

  useEffect(() => {
    fileIdRef.current = fileId;
  }, [fileId]);

  useEffect(() => {
    updatefileRef.current = updatefile;
  }, [updatefile]);

  useEffect(() => {
    setfilecontent(undefined)
    hydratedForFileIdRef.current = undefined;
  }, [fileId])

  const throttledUpdateFile = useMemo(() => {
    return ThrottleRequest((value: string) => {
      const currentFileId = fileIdRef.current;
      if (!currentFileId) return;
      updatefileRef.current(value, currentFileId);
    }, 4000);
  }, []);


  useEffect(() => {
    if (!fileId) return;
    if (!fileFromDb) return;

    if (hydratedForFileIdRef.current !== fileId) {
      setfilecontent(fileFromDb.content ?? "")
      hydratedForFileIdRef.current = fileId;
    }
  }, [fileFromDb, fileId]);

  const handlechange = useCallback((value: string) => {
    throttledUpdateFile(value)
    setfilecontent(value)
  }, [throttledUpdateFile])
  return (
    <div className="p-2 mt-1 h-1/2 overflow-y-clip" >
      <CodeMirror
        value={filecontent ?? ""}
        onChange={handlechange}
        height="90vh"
        className="overflow-y-clip"
        extensions={[extension, minimap, suggestion(filedata.filename!)]}
        theme={oneDark}
      />
    </div >
  )
}
export default CodeEditor
