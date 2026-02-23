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
    <div className="bg-[#18181b] w-full">
      <div className="flex items-center gap-[6px] py-[3px] pr-2" style={{ paddingLeft: `${padding === 3 ? 12 : padding}px` }}>
        {type === "file" ? (
          <>
            <div className="w-4" /> {/* align with folder's chevron */}
            <FileIcon className="w-[18px]" fileName={filename || "newfile"} />
          </>
        ) : (
          <>
            <ChevronRight size={16} className="text-zinc-400 rotate-90 transition-transform duration-200" />
            <FolderIcon className="w-[18px]" folderName={filename || "newfolder"} />
          </>
        )}
        <Input
          autoFocus
          value={filename}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await handleSubmit()
            }
            if (e.key === "Escape") {
              setfilename("")
              onSubmit()
            }
          }}
          onChange={(e) => setfilename(e.target.value)}
          className="h-6 text-[13px] bg-[#3c3c3c] border-[#007fd4] focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-0"
        />
      </div>
    </div>
  )

}

export default Addnewfileinput
