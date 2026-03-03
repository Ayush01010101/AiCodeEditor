"use client";
import type { ChatStatus } from "ai";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {
  Conversation as ConversationComponent,
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
import ConversationInput from "./ConversationInput";


export type ConversationInputProps = {
  onSubmit: (
    message: PromptInputMessage,
    event: FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
  status?: ChatStatus;
  onStop?: () => void;
  accept?: string;
  multiple?: boolean;
  globalDrop?: boolean;
  placeholder?: string;
  actionMenuContent?: ReactNode;
  toolsContent?: ReactNode;
};
const Conversation = ({
  onSubmit,
  status,
  onStop,
  accept,
  multiple,
  globalDrop,
  actionMenuContent,
  toolsContent,
}: ConversationInputProps) => {
  const [prompt, setprompt] = useState<string>("")
  const activeConversationId = useCurrentConversation((state) => state.ConversationId)
  console.log('activeConversationId', activeConversationId)
  if (!activeConversationId) return <h1>Hello world</h1>

  const messages = useGetConversationMessages(activeConversationId)
  return (
    <div className="w-[92%] flex flex-col gap-4  items-center">
      {!activeConversationId && <div className="h-[62vh]">
      </div>}
      {activeConversationId &&
        <div className="max-w-full mx-auto border   h-[62vh] relative size-full rounded-lg overflow-y-auto ">
          <div className="flex flex-col h-full">
            <ConversationComponent>
              <ConversationContent> {[].map((message) => (
                <Message key={message} from={message}>
                  <MessageContent >
                    <MessageResponse >{message}</MessageResponse>
                  </MessageContent>
                </Message>
              ))}
              </ConversationContent>
              <ConversationScrollButton />
            </ConversationComponent>

          </div>
        </div >


      }

    </div>
  );
};

export default Conversation;
