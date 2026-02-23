import { FC } from "react"
import CodeEditor from "./CodeEditor"
import { FileIcon } from "@react-symbols/icons/utils"
import useEditorstore from "./useEditorStore"
import { X } from "lucide-react"
const CodeEditorLayout: FC = () => {
  const currentSelectedFile = useEditorstore((state) => state.filedata)
  console.log(currentSelectedFile)
  return (
    currentSelectedFile.filename && < div >
      <div className="flex w-full overflow-x-auto bg-muted/30 border-b border-border">
        <div className="group flex items-center gap-2 px-3 py-2 bg-background border-t-2 border-t-blue-500 border-r border-border w-fit cursor-pointer">
          <span className="text-sm flex gap-2 justify-center items-center text-foreground italic">
            <FileIcon className="w-5" fileName={currentSelectedFile.filename} />
            {currentSelectedFile.filename}
          </span>
          <div className="p-0.5 rounded-md hover:bg-accent   hover:text-accent-foreground transition-colors  flex items-center justify-center text-muted-foreground">
            <X size={15} />
          </div>
        </div>

      </div>
      <CodeEditor />
    </div >
  )
}

export default CodeEditorLayout
