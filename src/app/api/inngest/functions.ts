import { inngest } from "@/inngest/client";
import Firecrawl from '@mendable/firecrawl-js';
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
export const gemini = inngest.createFunction(
  { id: "gemini" },
  { event: "api/ai/gemini" },
  async ({ event, step }) => {
    const { prompt } = event.data;
    let finalprompt: string
    const urlRegex = /\bhttps?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/g;
    const extractedUrlArray: [] = prompt.match(urlRegex) || [];

    if (extractedUrlArray.length > 0) {
      await step.run("scraping", async () => {

        const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWAL_API_KEY! });
        const result = extractedUrlArray.map((url) => {
          return firecrawl.scrape(url, {
            formats: ["markdown"],
          })
        })

        const results = await Promise.all(result)

        finalprompt = `context ${results} , user question ${prompt}`
        console.log('finalprompt', finalprompt)

        return results
      });
    }

    //extract the url form the prompt
    await step.run('LLM-gemini', async () => {
      const { text } = await generateText({
        model: google('gemini-3-flash-preview'),
        prompt: finalprompt ? finalprompt : prompt,
      });

      return text;

    })
  },
);
