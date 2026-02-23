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
interface renamefileProps {
  id: Id<'Files'>;
  name: string;
}

interface deletefileProps {
  id: Id<'Files'>;
}
const useGetFolderFiles = (
  projectId?: Id<"Project">,
  parentId?: Id<"Files">
) => {
  const data = useQuery(
    api.files.getFolderContent,
    projectId
      ? {
        projectId,
        parentId,
      }
      : "skip"
  );

  return () => data;
};
const useCreatefile = () => {
  const create = useMutation(api.files.create)
  async function createfile({ name, type, content, parentId, projectId }: createfileProps) {
    const createdFile = await create({
      name,
      type,
      content,
      parentId: parentId ? parentId : undefined,
      projectId,
      updatedAt: Date.now()
    })

    return createdFile

  }
  return createfile
}



const useRenamefile = () => {
  const file = useMutation(api.files.rename)
  async function renamefile({ id, name }: renamefileProps) {
    const updatedfile = await file({ id, name })
    return updatedfile
  }
  return renamefile
}



const useUpdatefile = () => {

  const file = useMutation(api.files.updateFileContent)

  async function updatefile(name: string, id: Id<'Files'>) {
    const updatedfile = await file({ id, content: name })
    return updatedfile
  }

  return updatefile
}


const useDeletefile = () => {
  const file = useMutation(api.files.deleteFile)

  async function deletefile({ id }: deletefileProps) {
    const deleted = await file({ id })
    return deleted
  }

  return deletefile
}




export {
  useGetFolderFiles, useCreatefile, useUpdatefile, useRenamefile, useDeletefile
}
