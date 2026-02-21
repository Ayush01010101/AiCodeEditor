import { FC, useMemo, useState } from "react"
import { ChevronRight } from "lucide-react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";

interface FileNode {
  _id: string
  name: string
  type: "file" | "folder"
  parentId?: string
  children?: FileNode[]
}

interface Props {
  filedata: FileNode[]
}

function buildTree(data: FileNode[], parentId?: string): FileNode[] {
  return data
    .filter(item => item.parentId === parentId)
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1
      return a.name.localeCompare(b.name)
    })
    .map(item => ({
      ...item,
      children:
        item.type === "folder"
          ? buildTree(data, item._id)
          : []
    }))
}

const Renderfiles: FC<Props> = ({ filedata }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const tree = useMemo(() => {
    return buildTree(filedata)
  }, [filedata])

  const toggleFolder = (id: string) => {
    setExpanded(prev => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }

  const renderTree = (nodes: FileNode[], level = 0) => {
    return nodes.map(node => (
      <div key={node._id}>
        <div
          onClick={() =>
            node.type === "folder" && toggleFolder(node._id)
          }
          className={`
            flex items-center gap-2
            py-1 px-2
            hover:bg-zinc-800
            text-sm text-zinc-300
            cursor-pointer
          `}
          style={{ paddingLeft: `${level * 16}px` }}
        >
          {node.type === "folder" && (
            <ChevronRight
              size={14}
              className={`
                transition-transform duration-200
                ${expanded.has(node._id) ? "rotate-90" : ""}
              `}
            />
          )}

          {node.type === "folder" ? (
            <FolderIcon className="w-6" folderName={node.name} />
          ) : (
            <FileIcon className="w-6" fileName={node.name} />
          )}

          <span className="truncate">{node.name}</span>
        </div>

        {node.type === "folder" &&
          expanded.has(node._id) &&
          node.children &&
          renderTree(node.children, level + 1)}
      </div>
    ))
  }

  return (
    <div className="bg-zinc-900 h-full overflow-y-auto p-2">
      {renderTree(tree)}
    </div>
  )
}

export default Renderfiles
