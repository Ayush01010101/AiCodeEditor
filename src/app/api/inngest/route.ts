import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { gemini } from "./functions";
import { messageProcessing } from "@/app/Features/inggest/messageProcessing";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    gemini,
    messageProcessing
  ],
});
