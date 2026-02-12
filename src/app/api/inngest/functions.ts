import { inngest } from "@/inngest/client";
import Firecrawl from '@mendable/firecrawl-js';
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
export const gemini = inngest.createFunction(
  { id: "gemini" },
  { event: "api/ai/gemini" },
  async ({ event, step }) => {
    const { prompt } = event.data;
    await step.run("scraping", async () => {
      const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWAL_API_KEY! });
      const doc = await firecrawl.scrape('https://amanyx.vercel.app/', { formats: ['markdown'] });
      return doc
    });

    await step.run('LLM-gemini', async () => {

      const { text } = await generateText({
        model: google('gemini-3-flash-preview'),
        prompt: prompt,
      });

      return text;

    })
  },
);
