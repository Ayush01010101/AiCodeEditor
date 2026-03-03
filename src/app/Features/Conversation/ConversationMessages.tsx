import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import useCurrentConversation from "@/zustand/useCurrentConversation";
import { useGetConversationMessages } from "../Hooks/ConversationCustomHooks";


const ConversationMessages = () => {
  const activeConversationId = useCurrentConversation((state) => state.ConversationId)
  if (!activeConversationId) {
    return (
      < div className="h-[62vh]" ></div>
    )
  }
  const messages = useGetConversationMessages(activeConversationId)
  console.log('message', messages)
  return (
    <div className="max-w-full mx-auto border  h-[62vh] relative size-full rounded-lg overflow-y-auto ">
      <div className="flex flex-col h-full">
        <Conversation >
          <ConversationContent>
            {[].map((message) => (
              <Message key={message} from={message}>
                <MessageContent >
                  <MessageResponse >{message}</MessageResponse>
                </MessageContent>
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>
    </div >
  );
};

export default ConversationMessages;
