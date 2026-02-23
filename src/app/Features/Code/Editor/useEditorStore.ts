import { create } from 'zustand'
import { Id } from '../../../../../convex/_generated/dataModel'

interface filedataType {
  filename: string | null,
  fileid: Id<'Files'> | null
}

interface EditorStoreType {
  filedata: filedataType
  addfiledata: (newdata: filedataType) => void,
  removefiledata: () => void
}

const useEditorstore = create<EditorStoreType>((set) => (
  {
    filedata: {
      filename: null,
      fileid: null
    },
    addfiledata: (newdata: filedataType) => {
      set(() => ({
        filedata: newdata
      }))
    },
    removefiledata: () => {
      set(() => ({
        filedata: {
          filename: null,
          fileid: null
        }
      }))
    }
  }
))
export default useEditorstore
