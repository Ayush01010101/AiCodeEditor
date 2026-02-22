import { create } from 'zustand'
const useStore = create((set) => ({
  fileid: null,
  addfileid: (id) =>
    set(() => ({
      fileid: id,
    })),
}))

export default useStore
