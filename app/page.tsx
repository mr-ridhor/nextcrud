import Image from "next/image";
import { Axios } from "@/axiosClient";
import Link from "next/link";
import { POST } from "./Types/postType";

const fetchPosts = async () => {
  const res = await Axios.get("/api/posts");
  // const res = await fetch("http://localhost:3000/api/posts", {
  //   next: {
  //     revalidate: 10,
  //   },
  // });
  const data = await res.data;
  return data.posts;
};
export default async function Home() {
  const posts = await fetchPosts();
  console.log(posts);
  return (
    <main className=" h-full w-full">
      <div className="md:w-2/4 sm:3/4 m-auto  my-5 p-4 rounded-lg bg-slate-800 drop-shadow-xl">
        <h2
          className="text-slate-200 text-center text-2xl font-extrabold
        font-[verdana]"
        >
          Fullstack Crup App with Next.js
        </h2>
      </div>
      {/* Link */}
      <div className=" flex">
        <Link
          href={"post/add"}
          className="bg-slate-200 font-semibold md:w-1/6 sm:2/4 rounded-md p-2 m-auto text-center"
        >
          Add New Blog 🚀
        </Link>
      </div>
      {/* Posts */}
      <div className="w-full flex flex-col justify-center items-center">
        {posts.map((post: POST) => (
          <div className="w-3/4 p-1 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center">
            {/* Title and Action */}
            <div className="flex items-center my-1">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold">{post.title}</h2>
              </div>
              <Link
                href={`post/edit/${post.id}`}
                className="px-4 py-2 bg-slate-900 rounded-md font-semibold text-slate-200 text-center text-xl"
              >
                Edit
              </Link>
            </div>
            {/* Date && Description */}
            <div className="mr-auto my-1">
              <blockquote className="text-slate-700 font-bold">
                {new Date(post.date).toDateString()}
              </blockquote>
            </div>
            <div className="mr-auto my-1">
              <h2>{post.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
