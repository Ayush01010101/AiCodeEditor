"use client";

import type { ChatStatus } from "ai";
import type { FormEvent, ReactNode } from "react";
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
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <PromptInputProvider>
        <PromptInput
          accept={accept}
          globalDrop={globalDrop}
          multiple={multiple}
          onSubmit={onSubmit}
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
