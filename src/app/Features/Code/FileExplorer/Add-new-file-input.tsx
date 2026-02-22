import useStore from "@/zustand/useStore";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { FC, useState } from "react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
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
  const fileid = useStore((state) => state.fileid)
  const clearfileid = useStore((state) => state.clearfileid)
  const createfile = useCreatefile()

  const handleSubmit = async () => {
    const trimmedName = filename.trim()
    if (!trimmedName) {
      return
    }

    await createfile({
      name: trimmedName,
      type,
      content: "",
      parentId: fileid ?? undefined,
      projectId,
    })
    setfilename("")
    clearfileid()
    onSubmit()
  }

  return (
    <div >
      <div className={`p-1 flex items-center gap-1 pl-${padding}`}>
        {type === "file" ? <FileIcon className="w-6" fileName={filename} /> : <div className="flex">
          <ChevronRight opacity={50} />
          <FolderIcon className="w-6" folderName={filename} />
        </div>}
        <Input
          value={filename}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await handleSubmit()
            }

          }}
          onChange={(e) => setfilename(e.target.value)} placeholder="name" className="w-full" />
      </div>

    </div >
  )

}

export default Addnewfileinput
