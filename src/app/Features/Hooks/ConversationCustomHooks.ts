import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetAllConversations = (projectid: Id<'Project'>) => {
  const getConversations = useQuery(api.converstations.getAllProjectconverstations, { projectid });
  return getConversations
};


export const useGetConversationMessages = (
  converstationId: Id<"Conversation"> | null | undefined
) => {
  const messages = useQuery(
    api.converstations.getMessages,
    converstationId ? { id: converstationId } : "skip"
  );

  return messages;
};


export const useCreateConversation = () => {

  const create = useMutation(api.converstations.create)
  async function createconversation(name: string, projectid: Id<'Project'>) {
    const created = await create({ name, projectid })
    console.log(created)
    return created
  }
  return createconversation
}


export const useGetConversationById = (id: Id<'Conversation'>, projectId: Id<'Project'>) => {
  const getconversation = useQuery(api.converstations.getConversationById, {
    id,
    projectId
  })

  return getconversation
}
