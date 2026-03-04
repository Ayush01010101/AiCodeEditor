import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {

  const body = await req.json()



  console.log(body.prompt)
  return NextResponse.json({
    data: body,
    statuscode: 200,
  })

}
