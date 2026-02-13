import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  await inngest.send({
    name: "api/ai/gemini",
    data: {
      prompt
    },
  });

  return NextResponse.json({ message: "Event sent!" });
}
