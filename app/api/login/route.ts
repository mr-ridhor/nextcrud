import { NextResponse } from "next/server";

export const GET = async (res: Request, req: Response) => {
//   console.log("Get Request.....");

  return new Response("Hello, Nextjs Crud App")
  //   let a = NextResponse.json()
  // let b= NextResponse.json({message:"Hello, Nextjs APP",},{status:200})
  // return b
  // return NextResponse.json(request.headers.get('host'))
  // return NextResponse.json(request.headers.get('user-agent'))
};
