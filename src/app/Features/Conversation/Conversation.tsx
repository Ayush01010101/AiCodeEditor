"use client";
import type { ChatStatus } from "ai";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import Image from "next/image";
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

  const allmessages = useGetConversationMessages(activeConversationId)
  console.log(allmessages)
  return (
    <div className="w-[92%] flex flex-col gap-4  items-center">

      <div className="max-w-full mx-auto border h-[62vh] relative size-full rounded-lg overflow-y-auto ">
        <div className="flex flex-col h-full">
          {activeConversationId ? <div>
          </div>
            : <div className="text-3xl justify-center flex flex-col items-center   h-full  gap-5">

              <Image width={60} height={20} className="opacity-60" alt="logo" src={'/logo.svg'} />
              <p className="font-bold text-lg opacity-50">Ask me anything</p>
            </div>}


        </div>
      </div >


      <ConversationInput />
    </div >
  );
};

export default Conversation;
