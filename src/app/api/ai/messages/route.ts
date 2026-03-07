import { NextResponse, NextRequest } from "next/server";
import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { auth } from "@clerk/nextjs/server";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export async function POST(req: NextRequest, res: NextResponse) {
  const userid = (await auth()).userId
  if (!userid) {
    throw new Error("You must be logged in to use this endpoint !!");
  }

  convex.query(api.converstations.createConverstation, {

  })
  const body = await req.json()

  return NextResponse.json({
    data: body,
    statuscode: 200,
  })

}
