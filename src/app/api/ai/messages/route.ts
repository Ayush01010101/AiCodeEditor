import { NextResponse, NextRequest } from "next/server";
import { api } from "../../../../../convex/_generated/api";
import { convexclient } from "@/app/utlity/ConvexClient";
import { auth } from "@clerk/nextjs/server";
import { Id } from "../../../../../convex/_generated/dataModel";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: {
      prompt: string,
      ConversationId: Id<'Conversation'>,
      projectId: Id<'Project'>
    } = await req.json()
    const userid = (await auth()).userId
    if (!userid) {
      throw new Error("You must be logged in to use this endpoint !!");
    }

    const key = process.env.KODA_KEY;
    if (!key) {
      throw new Error("You must provide a koda key !!");
    }
    const converstation = await convexclient.query(api.system.getconversationbyid, {
      ConversationId: body.ConversationId,
      Koda_key: key
    })
    if (!converstation) {
      console.log('covnerstaion not found !!')
      throw new Error("Conversation not found !!")
    }

    const createUserMessage = await convexclient.mutation(api.system.CreateMessage, {
      ConversationId: body.ConversationId,
      key,
      projectid: body.projectId,
      status: "complete",
      content: body.prompt,
      role: "user"
    })


    const createAssistantMessage = await convexclient.mutation(api.system.CreateMessage, {
      ConversationId: body.ConversationId,
      status: 'pending',
      key,
      projectid: body.projectId,
      content: "",
      role: "assistant"
    })

    return NextResponse.json({
      data: body
    });

  } catch (error) {
    console.log(error)
    //handle the case later
  }

}
