import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { prompt } = req.body;
  if (!prompt) {
    return NextResponse.error();
  }
  await inngest.send({
    name: "api/ai/gemini",
    data: {
      prompt
    },
  });

  return NextResponse.json({ message: "Event sent!" });
}
