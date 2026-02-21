import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { FC } from "react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
import { useState } from "react";
interface props {
  padding: number;
  onSubmit: () => void;
  type: 'file' | 'folder'

}
const Addnewfileinput: FC<props> = ({ onSubmit, padding, type }) => {
  const [filename, setfilename] = useState<string>("")
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
            }

          }}
          onChange={(e) => setfilename(e.target.value)} placeholder="name" className="w-full" />
      </div>

    </div >
  )

}

export default Addnewfileinput
