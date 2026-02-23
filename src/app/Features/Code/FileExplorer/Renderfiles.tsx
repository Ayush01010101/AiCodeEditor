import { FC, useEffect, useMemo, useRef, useState } from "react";
import useEditorstore from "../Editor/useEditorStore";
import useStore from "@/zustand/useStore";
import { ChevronRight } from "lucide-react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
import { Input } from "@/components/ui/input";
import { DataModel } from "../../../../../convex/_generated/dataModel";
import { useDeletefile, useRenamefile } from "./useFiles";
type FileDoc = DataModel["Files"]["document"];
type FileTreeNode = FileDoc & {
  children: FileTreeNode[];
};
type ContextMenuState = {
  x: number;
  y: number;
  nodeId: FileDoc["_id"];
} | null;

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
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
  const [editingId, setEditingId] = useState<FileDoc["_id"] | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  const addfileid = useStore((state) => state.addfileid)
  const clearfileid = useStore((state) => state.clearfileid)
  const fileid = useStore((state) => state.fileid)
  const renameFile = useRenamefile()
  const deleteFile = useDeletefile()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const addfiledataInzustand = useEditorstore((state) => state.addfiledata)


  const tree = useMemo(() => {
    return buildTree(filedata);
  }, [filedata]);

  useEffect(() => {
    const handleCloseContextMenu = () => {
      setContextMenu(null)
    }

    document.addEventListener("click", handleCloseContextMenu)

    return () => {
      document.removeEventListener("click", handleCloseContextMenu)
    }
  }, [])

  const toggleFolder = (id: FileDoc["_id"]) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next;
    });
  };

  const handleRename = async () => {
    if (!editingId) {
      return
    }

    const trimmedName = editingName.trim()
    if (!trimmedName) {
      return
    }

    await renameFile({
      id: editingId,
      name: trimmedName,
    })

    setEditingId(null)
    setEditingName("")
  }

  const handleDelete = async (id: FileDoc["_id"]) => {
    await deleteFile({ id })
  }

  const renderTree = (
    nodes: FileTreeNode[],
    level = 0
  ) => {
    return nodes.map((node) => (
      <div key={node._id}>
        <div
          onClick={() => {
            if (editingId === node._id) {
              return
            }

            if (node.type === 'folder') {
              const isCurrentlyExpanded = expanded.has(node._id)
              toggleFolder(node._id)
              if (!isCurrentlyExpanded) {
                // Opening folder
                addfileid(node._id)
              } else {
                // Closing folder
                if (fileid === node._id) {
                  clearfileid()
                }
              }
            } else {

              addfiledataInzustand({
                fileid: node._id,
                filename: node.name
              })
              if (!node.parentId) {
                clearfileid()
              }
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            setContextMenu({
              x: e.clientX,
              y: e.clientY,
              nodeId: node._id,
            })
          }}
          className={`flex items-center gap-[6px] py-[3px] pr-2 text-[13px] cursor-pointer w-full transition-colors ${fileid === node._id && node.type === 'folder' ? "bg-[#37373d] text-white" : "text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white"}`}
          style={{ paddingLeft: `${level * 12 + 12}px` }}
        >
          {node.type === "folder" ? (
            <ChevronRight
              size={16}
              className={`transition-transform duration-200 text-zinc-400 ${expanded.has(node._id)
                ? "rotate-90"
                : ""
                }`}
            />
          ) : (
            <div className="w-4" /> // spacing for non-folders
          )}

          {node.type === "folder" ? (
            <FolderIcon
              className="w-4.5"
              folderName={node.name}
            />
          ) : (
            <FileIcon
              className="w-[18px]"
              fileName={node.name}
            />
          )}
          {editingId === node._id ? (
            <Input
              autoFocus
              value={editingName}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setEditingName(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  e.stopPropagation()
                  await handleRename()
                }

                if (e.key === "Escape") {
                  setEditingId(null)
                  setEditingName("")
                }
              }}
              className="h-6 text-[13px] bg-[#3c3c3c] border-[#007fd4] focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-0 w-full check"
            />
          ) : (
            <span className="truncate text-sm">{node.name}</span>
          )}
        </div>

        {
          node.type === "folder" &&
          expanded.has(node._id) &&
          node.children.length > 0 &&
          renderTree(node.children, level + 1)
        }
      </div>
    ));
  };

  return (
    <div ref={containerRef} className="bg-[#18181b] h-full overflow-y-auto relative outline-none select-none">
      {renderTree(tree)}
      {contextMenu && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="fixed z-50 min-w-32 rounded-md border border-zinc-700 bg-zinc-900 py-1 shadow-lg"
        >
          <button
            type="button"
            className="w-full px-3 py-1.5 text-left text-sm text-zinc-200 hover:bg-zinc-800"
            onClick={() => {
              const node = filedata.find((item) => item._id === contextMenu.nodeId)
              if (!node) {
                return
              }

              setEditingId(node._id)
              setEditingName(node.name)
              setContextMenu(null)
            }}
          >
            Rename
          </button>
          <button
            type="button"
            className="w-full px-3 py-1.5 text-left text-sm text-red-400 hover:bg-zinc-800"
            onClick={async () => {
              await handleDelete(contextMenu.nodeId)
              setContextMenu(null)
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RenderFiles;
