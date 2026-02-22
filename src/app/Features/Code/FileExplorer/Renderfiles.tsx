import { FC, use, useMemo, useState } from "react";
import useStore from "@/zustand/useStore";
import { ChevronRight } from "lucide-react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
import { DataModel } from "../../../../../convex/_generated/dataModel";
type FileDoc = DataModel["Files"]["document"];

type FileTreeNode = FileDoc & {
  children: FileTreeNode[];
};

interface Props {
  filedata: FileDoc[]; // flat list from backend
}


function buildTree(
  data: FileDoc[],
  parentId?: FileDoc["_id"]
): FileTreeNode[] {
  return data
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => {
      if (a.type !== b.type)
        return a.type === "folder" ? -1 : 1;
      return a.name.localeCompare(b.name);
    })
    .map((item) => ({
      ...item,
      children:
        item.type === "folder"
          ? buildTree(data, item._id)
          : [],
    }));
}

const RenderFiles: FC<Props> = ({ filedata }) => {
  const [expanded, setExpanded] = useState<
    Set<FileDoc["_id"]>
  >(new Set());

  const addfileid = useStore((state) => state.addfileid)
  const tree = useMemo(() => {

    return buildTree(filedata);
  }, [filedata]);

  const toggleFolder = (id: FileDoc["_id"]) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const renderTree = (
    nodes: FileTreeNode[],
    level = 0
  ) => {
    return nodes.map((node) => (
      < div key={node._id} >
        <div
          onClick={() => {
            if (node.type === 'folder') {
              console.log('clicked on the folder')
              addfileid(node._id)
            }
            node.type === "folder" &&
              toggleFolder(node._id)

          }
          }
          className="flex items-center gap-2 py-1 px-2 hover:bg-zinc-800 text-sm text-zinc-300 cursor-pointer"
          style={{ paddingLeft: `${level * 16}px` }}
        >
          {node.type === "folder" && (
            <ChevronRight
              size={14}
              className={`transition-transform duration-200 ${expanded.has(node._id)
                ? "rotate-90"
                : ""
                }`}
            />
          )}

          {node.type === "folder" ? (
            <FolderIcon
              className="w-6"
              folderName={node.name}
            />
          ) : (
            <FileIcon
              className={`w-6 ml-[${level + 12}]`}
              fileName={node.name}
            />
          )}
          <span className="truncate">
            {node.name}
          </span>
        </div >

        {
          node.type === "folder" &&
          expanded.has(node._id) &&
          node.children.length > 0 &&
          renderTree(node.children, level + 1)
        }
      </div >
    ));
  };

  return (
    <div className="bg-zinc-900 h-full overflow-y-auto p-2">
      {renderTree(tree)}
    </div>
  );
};

export default RenderFiles;
