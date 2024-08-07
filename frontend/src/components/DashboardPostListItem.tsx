import { formatDate } from "@/helpers/formatter";
import { Post } from "@/models/Post";
import React from "react";
import UserProfileImage from "./UserProfileImage";

type DashboardPostListItemProps = {
  post: Post;
};

const DashboardPostListItem: React.FC<DashboardPostListItemProps> = ({
  post,
}) => {
  return (
    <div className="flex flex-col px-4 py-6 border rounded mb-4">
      <h3 className="text-2xl font-bold">{post.title}</h3>
      <div className="flex space-x-1">
        <UserProfileImage user={post.author} />
        <div className="flex flex-col justify-center">
          <span className="text-sm">{post.author.name}</span>
          <span className="text-gray-500 text-xs">
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPostListItem;
