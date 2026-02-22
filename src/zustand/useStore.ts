import { create } from 'zustand'
import { Id } from '../../convex/_generated/dataModel'

type StoreState = {
  fileid: Id<'Files'> | null
  addfileid: (id: Id<'Files'> | null) => void
  clearfileid: () => void
}

const useStore = create<StoreState>((set) => ({
  fileid: null,
  addfileid: (id) =>
    set(() => ({
      fileid: id,
    })),
  clearfileid: () =>
    set(() => ({
      fileid: null,
    })),
}))

export default useStore
