import { create } from 'zustand'
import { Id } from '../../convex/_generated/dataModel'

type StoreState = {
  ConversationId: Id<'Conversation'> | null
  addConversationId: (id: Id<'Conversation'>) => void
  clearConversationId: () => void
}

const useCurrentConversation = create<StoreState>((set) => (
  {
    ConversationId: null,
    addConversationId: (id) =>
      set(() => ({
        ConversationId: id,
      })),
    clearConversationId: () =>
      set(() => ({
        ConversationId: null,
      }))
  }
))

export default useCurrentConversation
