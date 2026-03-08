import { NextResponse, NextRequest } from "next/server";
import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { auth } from "@clerk/nextjs/server";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json()
    const userid = (await auth()).userId
    if (!userid) {
      throw new Error("You must be logged in to use this endpoint !!");
    }

    const key = process.env.KODA_KEY;
    if (!key) {
      throw new Error("You must provide a koda key !!");
    }
    console.log(req.body)
    return NextResponse.json({

      data: body
    });

  } catch (error) {
    console.log(error)

  }

}
