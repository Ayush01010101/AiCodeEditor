import useStore from "@/zustand/useStore";
import { FC, useState } from "react";
import Filetrayheader from "./File-tray-header";
import { usegetFolderFiles } from "./useFiles";
import Addnewfileinput from "./Add-new-file-input";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import Renderfiles from "./Renderfiles";
const FileTrayView: FC = () => {
  const params = useParams();
  const [showinput, setshowinput] = useState<boolean>(false)
  const [filetype, setfiletype] = useState<'file' | 'folder'>('file')
  const fileid = useStore((state) => state.fileid)
  const projectId = params.Projectid as Id<"Project">;

  if (!projectId) {
    return <div>loading ...</div>
  }
  const getFolderFiles = usegetFolderFiles(projectId as Id<'Project'>);
  const files = getFolderFiles();

  if (!files) {
    return (
      <div className="p-4 text-zinc-400">
        Loading files...
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <Filetrayheader
        HandlCreateFile={() => {
          setshowinput(!showinput)
          setfiletype('file')
        }}
        HandleCreateFolder={() => {
          setshowinput(!!showinput)
          setfiletype('folder')
        }}
      />

      {showinput && <Addnewfileinput projectId={projectId} padding={3} type={filetype} onSubmit={() => {

      }} />}

      <div className="flex-1 overflow-hidden">
        <Renderfiles filedata={files} />
      </div>
    </div>
  );
};

export default FileTrayView;
