import { inngest } from "@/inngest/client";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
export const gemini = inngest.createFunction(
  { id: "gemini" },
  { event: "api/ai/gemini" },
  async ({ event, step }) => {

    const { text } = await generateText({
      model: google('gemini-3-flash-preview'),
      prompt: 'Hello world',
    });

    return text;
  },
);
