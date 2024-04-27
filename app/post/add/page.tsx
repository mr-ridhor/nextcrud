"use client";
import { POST } from "@/app/Types/postType";
import { useRouter } from "next/navigation";

import { Fragment, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const postInfo = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const res = fetch("http://localhost:3000/api/posts", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};
const AddPost = async () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sendind Request 🚀", { id: "1" });
      await postInfo({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
      });
      toast.success("Post created");
      router.push("/");
    }
  };
  return (
    <Fragment>
      <Toaster />
      <div className="w-full mx-auto flex my-2">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">Add Edit Post</p>
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
            <button
              onClick={handleSubmit}
              className="hover:bg-slate-100 bg-slate-200 rounded-lg font-semibold px-4 py-2 shadow-xl mx-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddPost;
