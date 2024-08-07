"use client";

import DashboardPostListItem from "@/components/DashboardPostListItem";
import EditIcon from "@/components/icons/Edit";
import Loader from "@/components/icons/Loader";
import useAuth from "@/hooks/useAuth";
import usePosts from "@/hooks/usePosts";
import { Post } from "@/models/Post";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { user } = useAuth();
  const { getCurrentUsersPost } = usePosts();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      const fetchPostsList = async () => {
        const response = await getCurrentUsersPost();

        setPosts(response);

        setIsLoading(false);
      };

      fetchPostsList();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center mt-40 animate-spin">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col py-10 container mx-auto px-5 md:px-0">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <Link
          href={"/dashboard/new-post"}
          className="my-2 flex space-x-1 items-center border rounded-full px-4 py-2 hover:bg-gray-100 duration-200 mb-4"
        >
          <EditIcon />
          <span className="">New Post</span>
        </Link>
        {posts.map((post, index) => (
          <div key={post.id} className="flex flex-col self-start w-full">
            <DashboardPostListItem post={post} />
            {/* {index !== posts.length - 1 && (
              <hr className="border-gray-200 my-4" />
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
