
import { deletePost, getById, updatePost } from "@/app/lib/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const id = req.url.split("posts/")[1];
    console.log("...", id);
    const post = getById(id);
    if (post) {
      return NextResponse.json({ message: "Ok", post }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { title, description } = await req.json();
    const id = req.url.split("posts/")[1];
    updatePost(id, title, description);
    return NextResponse.json({ message: "OK", updatePost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};


export const DELETE=async(req:Request)=>{
    try {
        const id=req.url.split("posts/")[1]
        deletePost(id)
    return NextResponse.json({ message: "OK" }, { status: 200 });

    } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
        
    }
}
