import useStore from "@/zustand/useStore";
import { FC, useEffect, useRef, useState } from "react";
import Filetrayheader from "./File-tray-header";
import { useGetFolderFiles } from "./useFiles";
import Addnewfileinput from "./Add-new-file-input";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import Renderfiles from "./Renderfiles";
const FileTrayView: FC = () => {
  const params = useParams();
  const [showinput, setshowinput] = useState<boolean>(false)
  const [filetype, setfiletype] = useState<'file' | 'folder'>('file')
  const clearfileid = useStore((state) => state.clearfileid)
  const createInputRef = useRef<HTMLDivElement | null>(null)
  const projectId = params.Projectid as Id<"Project"> | undefined;
  const getFolderFiles = useGetFolderFiles(projectId);
  const files = getFolderFiles();

  useEffect(() => {
    if (!showinput) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        createInputRef.current &&
        !createInputRef.current.contains(event.target as Node)
      ) {
        setshowinput(false)
        clearfileid()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showinput, clearfileid])

  if (!projectId) {
    return <div>loading ...</div>
  }

  if (!files) {
    return (
      <div className="p-4 text-zinc-400">
        Loading files...
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full bg-[#18181b]">
      <Filetrayheader
        HandlCreateFile={() => {
          setshowinput(true)
          setfiletype('file')
        }}
        HandleCreateFolder={() => {
          setshowinput(true)
          setfiletype('folder')
        }}
      />

      {showinput && (
        <div ref={createInputRef}>
          <Addnewfileinput
            projectId={projectId}
            padding={3}
            type={filetype}
            onSubmit={() => {
              setshowinput(false)
            }}
          />
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <Renderfiles filedata={files} />
      </div>
    </div>
  );
};

export default FileTrayView;
