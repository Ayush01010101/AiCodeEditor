"use client"
import { Plus, RotateCcw } from "lucide-react"
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { FC } from "react"
import { useParams } from "next/navigation"
import { useGetAllConversations, useCreateConversation } from "../Hooks/ConversationCustomHooks";

const ConversationHeader: FC = () => {
  const createconversation = useCreateConversation()
  const { Projectid } = useParams()
  const allconversation = useGetAllConversations(Projectid as Id<'Project'>)
  console.log(
    allconversation[0].name
  )
  return (
    <div className="bg-[#18191a] text-sm  flex p-4 font-medium justify-between items-center h-8">
      <p className="opacity-70">
        {allconversation?.length == 0 ? "new conversation" : "hello"}

      </p>
      <div className="flex opacity-70 items-center gap-2">
        <Plus onClick={async () => {
          await createconversation('New Conversation', Projectid as Id<'Project'>)
        }} size={20} cursor={'pointer'} />
        <RotateCcw onClick={() => {
          if (allconversation) {
            if (allconversation?.length <= 1) {
              toast.error("No conversation found !!")
            }

          }

        }} size={16} cursor={'pointer'} />
      </div>

    </div >

  )
}
export default ConversationHeader
