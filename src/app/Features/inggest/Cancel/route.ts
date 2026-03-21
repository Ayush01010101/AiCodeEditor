import { NextRequest, NextResponse } from "next/server";
import { convexclient } from "@/app/utlity/ConvexClient";
import { inngest } from "@/inngest/client";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export async function POST(req: NextRequest) {
  try {
    const body: { projectId: Id<"Project"> } = await req.json();
    const key = process.env.KODA_KEY;
    console.log('body', body)

    if (!key) {
      throw new Error("You must provide a koda key !!");
    }

    const pendingMessages = await convexclient.query(api.system.getPendingMessages, {
      projectid: body.projectId,
      key,
    });

    if (pendingMessages.length == 0) {
      return NextResponse.json({
        data: {
          success: true,
          cancelled: 0,
          message: "No pending messages found",
        },
      });
    }

    const cancellationEvents = await Promise.all(
      pendingMessages.map((message) =>
        inngest.send({
          name: "message/cancel",
          data: {
            messageId: message._id,
          },
        }),
      ),
    );

    const eventIds = cancellationEvents.flatMap((event) => event.ids);

    return NextResponse.json({
      data: {
        success: true,
        cancelled: pendingMessages.length,
        eventIds,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
