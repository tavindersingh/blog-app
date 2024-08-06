import { Post } from "@/models/Post";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserProfileImage from "./UserProfileImage";
import { formatDate } from "@/helpers/formatter";

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
      <div className="flex space-x-1">
        <UserProfileImage user={post.author} />
        <div className="flex flex-col justify-center">
          <span className="text-sm">{post.author.name}</span>
          <span className="text-gray-500 text-xs">
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostListItem;
