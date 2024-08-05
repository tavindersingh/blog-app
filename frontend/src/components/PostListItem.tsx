import { Post } from "@/models/Post";
import Link from "next/link";
import React from "react";

type PostListItemProps = {
  post: Post;
};

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  return (
    <Link
      href={`/${post.id}`}
      className="flex flex-col bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-xl duration-200"
    >
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <span className="text-sm">By: {post.author.name}</span>
      <span className="text-gray-500 text-xs">{post.createdAt}</span>
    </Link>
  );
};

export default PostListItem;
