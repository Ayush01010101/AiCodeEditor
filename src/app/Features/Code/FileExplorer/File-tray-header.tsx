import { useQuery } from "convex/react"
import { cn } from "@/lib/utils"
import { ChevronRight, FilePlusCorner, FolderPlus } from "lucide-react"
import { FC, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"

interface props {
  HandlCreateFile: () => void;
  HandleCreateFolder: () => void
}

const Filetrayheader: FC<props> = ({ HandlCreateFile, HandleCreateFolder }) => {
  const [isfilesopen, setisfilesopen] = useState<boolean>()
  const { Projectid } = useParams()
  const projectdata = useQuery(api.projects.getById, { id: Projectid as Id<"Project"> })

  return (
    <div>
      <div className="w-full bg-secondary flex items-center justify-between p-3 h-12">
        <div className="flex items-center gap-1">
          <ChevronRight onClick={() => setisfilesopen(!isfilesopen)} className={cn("cursor-pointer", isfilesopen && "rotate-90")} />
          {(projectdata?.name) ? projectdata.name : <div></div>}
        </div>
        <div className="flex h-full gap-2 items-center">
          <FilePlusCorner onClick={HandlCreateFile} className="cursor-pointer" size={20} opacity={65} color="white" />
          <FolderPlus onClick={HandleCreateFolder} className="cursor-pointer" size={20} opacity={65} color="white" />
        </div>

      </div>
    </div>
  )
}

export default Filetrayheader 
