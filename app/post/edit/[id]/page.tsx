"use client";
import { POST } from "@/app/Types/postType";
import { useRouter } from "next/navigation";

import { Fragment, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";


type updatePostProp={
    title:string;
    description:string;
    id:string
}
const updatePost=async(data:updatePostProp)=>{
  const res = fetch(`http://localhost:3000/api/posts/${data.id}`, {
    method:"PUT",
    body: JSON.stringify({ title:data.title, description:data.description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();


}
const deletePost=async(id:string)=>{
    const res = fetch(`http://localhost:3000/api/posts/${id}`, {
      method:"Delete",
      //@ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  
  
  }
const getPostById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`);
  const data = await res.json();
  return data.post;
};
const EditPost = async ({ params }: { params: { id: string } }) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const router=useRouter()
 
  useEffect(() => {
    toast.loading("Fextching Post Details🚀", { id: "1" });
    getPostById(params.id)
      .then((data) => {
    if (titleRef.current && descriptionRef.current) {
        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description;
        toast.success("Fetching Complete", { id: "1" });
   } })
      .catch((err: any) => {
        console.log(err);
        toast.error("Error fetching post", { id: "1" });
      });
  }, []);


    const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sendind Request 🚀", { id: "1" });
      await updatePost({
        id:params.id,
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
      });
      toast.success("Post updated successfully");
      router.push("/")
    }
  };
  const handleDelete=async()=>{
    toast.loading("Deleting Post",{id:"2"})
    await deletePost(params.id)
    toast.success("Post Deleted",{id:"2"})
    router.push("/")

  }


  return (
    <Fragment>
      <Toaster />
      <div className="w-full mx-auto flex my-2">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3"> Edit Post</p>
          <form action="">
            <input
              ref={titleRef}
              type="text"
              placeholder="Enter Title"
              className="rounded-md px-4 py-2 my-2 w-full"
            />
            <textarea
              className="rounded-md px-4 py-2 my-2 w-full "
              placeholder="Enter Description"
              ref={descriptionRef}
            ></textarea>
            <div className="flex w-full justify-between items-center">

            <button
              onClick={handleSubmit}
              className="hover:bg-slate-100 bg-slate-200 rounded-lg font-semibold px-4 py-2 shadow-xl mx-auto"
            >
             Update
            </button>
            </div>
          </form>
            <button
              onClick={handleDelete}
              className="hover:bg-red-100 bg-red-500 rounded-lg my-2 font-semibold px-4 py-2 shadow-xl mx-auto"
            >
            Delete
            </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditPost;
