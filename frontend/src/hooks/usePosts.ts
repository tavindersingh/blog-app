import client from "@/app/helpers/api";
import { Post } from "@/models/Post";

const usePosts = () => {
  const getCurrentUsersPost = async () => {
    const response = await fetch("/api/posts/me", { method: "GET" });

    if (response.ok) {
      const data = await response.json();

      return data.posts;
    } else {
      return [];
    }
  };

  const createNewPost = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    const response = await client.post("/posts", {
      title,
      content,
    });
  };

  return { getCurrentUsersPost, createNewPost };
};

export default usePosts;
