"use client";
import { cosineSimilarity, type ChatStatus } from "ai";
import type { ChatStatus } from "ai";
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

const handlesubmit = async (prompt: string) => {
  const response = await ky.post('/api/ai/messages', {
    json: {
      prompt,
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
          onSubmit={() => handlesubmit(prompt)}
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
    </div>
  );
};
export default ConversationInput;
