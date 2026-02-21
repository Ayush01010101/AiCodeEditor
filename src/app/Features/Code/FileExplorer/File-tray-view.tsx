import { FC, useState } from "react";
import Filetrayheader from "./File-tray-header";
import { usegetFolderFiles } from "./useFiles";
import Addnewfileinput from "./Add-new-file-input";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import Renderfiles from "./Renderfiles";

interface Props { }

const FileTrayView: FC = () => {
  const params = useParams();
  const projectId = params.Projectid as Id<"Project">;

  if (!projectId) {
    return <div>loading ...</div>
  }
  const [filetype, setfiletype] =
    useState<"folder" | "file">("file");

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
        HandlCreateFile={() => setfiletype("file")}
        HandleCreateFolder={() => setfiletype("folder")}
      />

      <Addnewfileinput
        type={filetype}
        projectId={projectId as Id<'Project'>}
      />

      <div className="flex-1 overflow-hidden">
        <Renderfiles filedata={files} />
      </div>
    </div>
  );
};

export default FileTrayView;
