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

const messages = [
  {
    id: "1",
    role: "user" as const,
    text: "Hey, can you share a quick project update?",
  },
  {
    id: "2",
    role: "assistant" as const,
    text: "Sure! The conversation UI is now simplified with two hardcoded messages and a clean structure.",
  },
];

const ConversationMessages = () => {
  return (
    <div className="max-w-full mx-auto border  h-[62vh] relative size-full rounded-lg overflow-y-auto ">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent>
            {messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent >
                  <MessageResponse >{message.text}</MessageResponse>
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
