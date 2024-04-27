
import { addPost, getPosts } from "@/app/lib/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const posts = getPosts();
    console.log(posts);
    return NextResponse.json({ message: "Ok", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
export const POST = async (req: Request, res: Response) => {
  const { title, description } = await req.json();
  try {
    const post = {
      title,
      description,
      id: Date.now().toString(),
      date: new Date(),
    };
    addPost(post);
    return NextResponse.json({ message: "Created", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }.error, {
      status: 500,
    });
  }
};
