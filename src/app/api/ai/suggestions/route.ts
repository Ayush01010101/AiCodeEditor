import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullcode, selectedCode, userprompt } = body;

    if (!fullcode || !selectedCode || !userprompt) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const prompt = `
You are operating inside a real code editor.

The user has selected a specific portion of code inside a file.
That selected portion is an isolated editable region.

You are ONLY allowed to modify that selected region.
You are NOT allowed to:
- Rewrite the entire file
- Return the entire file
- Add new imports outside the selected region
- Modify code outside the selected region
- Add explanations
- Add comments
- Add markdown
- Add backticks
- Add extra formatting

You must behave exactly like an inline editor that replaces only the selected text.

Your output must contain ONLY the updated version of the selected text.
Nothing else.

If the instruction requires no change, return the selected text exactly as it is.

USER INSTRUCTION:
${userprompt}

SELECTED REGION (ONLY THIS CAN BE MODIFIED):
${selectedCode}

FULL FILE (READ-ONLY CONTEXT — DO NOT MODIFY OR RETURN):
${fullcode}
`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
      temperature: 0,
    });

    return NextResponse.json({ data: text });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
