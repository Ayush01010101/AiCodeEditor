import useStore from "@/zustand/useStore";
import { useRenamefile } from "./useFiles";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { FC, useRef } from "react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
import { useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useCreatefile } from "./useFiles";
interface props {
  padding: number;
  onSubmit: () => void;
  type: 'file' | 'folder'
  projectId: Id<"Project">

}
const Addnewfileinput: FC<props> = ({ projectId, onSubmit, padding, type }) => {



  const [filename, setfilename] = useState<string>("")
  const fileid = useRef(useStore((state) => state.fileid))
  console.log('fileid', fileid)
  const createfile = useCreatefile({
    name: filename,
    type: type,
    content: "",
    parentId: fileid.current ? fileid.current : undefined,
    projectId
  })
  return (
    <div >
      <div className={`p-1 flex items-center gap-1 pl-${padding}`}>
        {type === "file" ? <FileIcon className="w-6" fileName={filename} /> : <div className="flex">
          <ChevronRight opacity={50} />
          <FolderIcon className="w-6" folderName={filename} />
        </div>}
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit()
              createfile()
              onSubmit()
            }

          }}
          onChange={(e) => setfilename(e.target.value)} placeholder="name" className="w-full" />
      </div>

    </div >
  )

}

export default Addnewfileinput
