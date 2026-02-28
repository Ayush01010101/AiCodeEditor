import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";



export const useGetAllConversations = (projectid: Id<'Project'>) => {

  const getConversations = useQuery(api.converstations.getAllProjectconverstations, { projectid });

  return getConversations
};


export const useGetConversationMessages = (converstationId: Id<'Conversation'>) => {

  const getConversations = useQuery(api.converstations.getMessages,
    {
      id: converstationId
    });

  return getConversations;
}


export const useCreateConversation = (name: string, projectid: Id<'Project'>) => {

  const create = useMutation(api.converstations.create)
  async function createconversation() {
    await create({ name, projectid })
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

