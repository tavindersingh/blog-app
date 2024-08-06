"use client";

import RichTextEditor from "@/components/RichTextEditor";
import usePosts from "@/hooks/usePosts";
import { useState } from "react";

const NewPostPage = () => {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");

  const { createNewPost } = usePosts();

  const createPost = async () => {
    await createNewPost({ title, content: markdown });
  };

  return (
    <div>
      <RichTextEditor
        markdown={markdown}
        onContentChange={setMarkdown}
        title={title}
        onTitleChange={setTitle}
        onPublish={createPost}
      />
    </div>
  );
};

export default NewPostPage;
