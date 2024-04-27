import { POST } from "../Types/postType";

let posts: POST[] = [];

//handlers
export const getPosts = () => {
  return posts;
};

export const addPost = (post: POST) => {
  posts.push(post);
};

export const deletePost = (id: string) => {
  posts = posts.filter((post) => post.id !== id);
};

export const updatePost = (
  id: string,
  title: string,
  description: string,
  
) => {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.title = title;
    post.description = description;
   
  } else {
    throw "Post not found";
  }
};

export const getById = (id: string) => {
  return posts.find((post) => post.id === id);
};
