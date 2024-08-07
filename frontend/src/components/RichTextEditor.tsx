"use client";
import { htmlToMarkdown } from "@/helpers/parsers";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

type RichTextEditorProps = {
  title: string;
  markdown: string;
  onTitleChange: (title: string) => void;
  onContentChange: (markdown: string) => void;
  onPublish: () => void;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  markdown,
  onContentChange,
  title,
  onTitleChange,
  onPublish,
}) => {
  const [content, setContent] = useState("");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);

    const markdown = htmlToMarkdown(newContent);
    onContentChange(markdown);
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-3xl mx-auto py-10 space-y-5 px-2">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Title"
          className="w-full text-4xl font-bold focus:outline-none bg-transparent"
          autoFocus
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <button
          onClick={title.length == 0 ? undefined : onPublish}
          className={`flex text-white font-bold py-1 px-4 rounded-full duration-200 ${
            title.length == 0 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Publish
        </button>
      </div>
      <QuillEditor
        value={content}
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
        className="w-full h-full bg-transparent"
      />
    </div>
  );
};

export default RichTextEditor;
