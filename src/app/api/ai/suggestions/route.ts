import { NextResponse } from "next/server";
import { google } from '@ai-sdk/google';
import { generateText } from "ai";
export async function POST(req: Request) {
  console.log('route trigger')
  try {
    const body = await req.json();
    const { fullcode, selectedCode, userprompt } = body
    if (!fullcode || !selectedCode || !userprompt) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const model = google("gemini-2.5-flash")
    const contextPrompt = `
You are a code transformation engine inside an IDE.
Your task is to update the provided file strictly according to the user's instruction.
Rules you MUST follow:
1. Return ONLY the updated code.
2. Do NOT include explanations.
3. Do NOT include comments describing the change.
4. Do NOT include markdown formatting.
5. Do NOT include backticks.
6. Do NOT include greetings or any extra text.
7. Do NOT summarize anything.
8. If no change is needed, return the original file content exactly as it is.
9. Preserve all existing code formatting, indentation, and structure unless the instruction requires modification.
10. Never output anything except the final full updated file content.

You are not an assistant. You are a pure code editor.

`
    const userPrompt = `
      USER-INSTRUCTION
      ${userprompt}      

      FILE-SELECTED-CONTENT
      ${selectedCode}

      FILE-FULL-CONTENT
      ${fullcode}

  
`
    const prompt = `${contextPrompt} ${userPrompt}`

    //generatetext from gemeini
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
    });
    return NextResponse.json({ data: text });

  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
