"use client";

import RichTextEditor from "@/components/RichTextEditor";
import usePosts from "@/hooks/usePosts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const NewPostPage = () => {
  const router = useRouter();

  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");

  const { createNewPost } = usePosts();

  const createPost = async () => {
    await createNewPost({ title, content: markdown });
    showSuccessToast();

    setTimeout(() => {
      router.replace("/dashboard");
    }, 2000);
  };

  const showSuccessToast = () => {
    toast.success("Post created successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div>
      <div className="px-5 md:px-0">
        <RichTextEditor
          markdown={markdown}
          onContentChange={setMarkdown}
          title={title}
          onTitleChange={setTitle}
          onPublish={createPost}
        />
      </div>
    </div>
  );
};

export default NewPostPage;
