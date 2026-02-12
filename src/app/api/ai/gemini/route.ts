import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  // Send your event payload to Inngest
  await inngest.send({
    name: "api/ai/gemini",
    data: {
      email: "testUser@example.com",
    },
  });

  return NextResponse.json({ message: "Event sent!" });
}
