import { useQuery, useMutation } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel";

interface createfileProps {
  name: string;
  type: "folder" | "file";
  content?: string;
  projectId: Id<'Project'>;
  parentId?: Id<'Files'>;
}

const usegetFolderFiles = (projectId: Id<'Project'>, parentId?: Id<'Files'>) => {
  async function getFolderContent() {
    const args = parentId ? { projectId: projectId, parentId: parentId } : { projectId: projectId }
    const contentfile = useQuery(api.files.getFolderContent, args);
    return contentfile
  }

  return getFolderContent

}


const useCreatefile = ({ name, type, content, parentId, projectId }: createfileProps) => {

  console.log('usecreatefile trigger')
  const create = useMutation(api.files.create)
  async function createfile() {
    const createdFile = await create({
      name,
      type,
      content,
      parentId,
      projectId,
      updatedAt: Date.now()
    })

    return createdFile

  }

  return createfile


}
const useRenamefile = (name: string, id: Id<'Files'>) => {

  const file = useMutation(api.files.rename)
  async function renamefile() {
    const updatedfile = await file({ id, name })
    return updatedfile
  }

  return renamefile
}



const useUpdatefile = (name: string, id: Id<'Files'>) => {

  const file = useMutation(api.files.updateFileContent)

  async function updatefile() {

    const updatedfile = await file({ id, content: name })
    return updatedfile
  }

  return updatefile
}




export {
  usegetFolderFiles, useCreatefile, useUpdatefile, useRenamefile
}
