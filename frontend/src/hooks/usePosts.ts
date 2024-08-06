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

  return { getCurrentUsersPost };
};

export default usePosts;
