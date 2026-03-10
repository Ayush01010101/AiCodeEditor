"use client";
import { type ChatStatus } from "ai";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import ky from 'ky';
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
import useCurrentConversation from "@/zustand/useCurrentConversation";
import { useCreateConversation } from "../Hooks/ConversationCustomHooks";
import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
const handlesubmit = async (prompt: string, ConversationId: any, createConversation: any, projectId: Id<'Project'> | undefined) => {
  if (!projectId) {
    return;
  }
  let id = ""
  if (!ConversationId) {
    id = await createConversation('New Conversation', "j979m52fv77n5tw8mg4xv73f49814rsj")
  }
  const response = await ky.post('/api/ai/messages', {
    json: {
      prompt,
      projectId,
      ConversationId: ConversationId ? ConversationId : id
    }
  }).json()

  console.log('responce', response)
}
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
const ConversationInput = ({
  onSubmit,
  status,
  onStop,
  accept,
  multiple,
  globalDrop,
  placeholder,
  actionMenuContent,
  toolsContent,
}: ConversationInputProps) => {
  const createConversation = useCreateConversation()
  const { Projectid } = useParams()
  const activeConversationId = useCurrentConversation(
    (state) => state.ConversationId
  );
  const [prompt, setprompt] = useState<string>("");
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <PromptInputProvider>
        <PromptInput
          accept={accept}
          globalDrop={globalDrop}
          multiple={multiple}
          onSubmit={() => handlesubmit(prompt, activeConversationId, createConversation, Projectid as Id<'Project'>)}
          onChange={(e) => { setprompt(e.target.value) }}
        >
          <PromptInputBody>
            <PromptInputTextarea placeholder={placeholder} />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                  {actionMenuContent}
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              {toolsContent}
            </PromptInputTools>
            <PromptInputSubmit onStop={onStop} status={status} />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
    </div >
  );
};
export default ConversationInput;
