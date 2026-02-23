import { useQuery } from "convex/react"
import { cn } from "@/lib/utils"
import { FilePlus, FolderPlus } from "lucide-react"
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
    <div className="w-full flex items-center justify-between px-4 h-8 bg-[#18181b] group">
      <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-zinc-400">
        {(projectdata?.name) ? projectdata.name : <div>EXPLORER</div>}
      </div>
      <div className="flex h-full gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button onClick={HandlCreateFile} className="hover:bg-zinc-800 p-1 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors">
          <FilePlus size={14} />
        </button>
        <button onClick={HandleCreateFolder} className="hover:bg-zinc-800 p-1 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors">
          <FolderPlus size={14} />
        </button>
      </div>
    </div>
  )
}

export default Filetrayheader 
