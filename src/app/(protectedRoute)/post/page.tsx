"use client";
import BlogForm from "@/components/molecules/BlogForm";
import BlogPreview from "@/components/molecules/BlogPreview";
import { postContentType } from "@/interface/interface";
import React, { useState } from "react";

export default function PostPage() {
  const [title, setTitle] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [isUseBackground, setIsUseBackground] = useState<boolean>(false);
  const [content, setContent] = useState<postContentType[]>([]);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  return (
    <main className="min-h-screen relative">
      <button
        className={`btn btn-sm absolute top-2 right-2 ${
          isPreview ? "btn-error" : "btn-primary"
        }`}
        onClick={() => setIsPreview(!isPreview)}
      >
        {isPreview ? "Close Preview" : "Preview"}
      </button>
      {!isPreview ? (
        <BlogForm
          background={background}
          content={content}
          isUseBackground={isUseBackground}
          setBackground={setBackground}
          setContent={setContent}
          setIsUseBackground={setIsUseBackground}
          setTitle={setTitle}
          title={title}
        />
      ) : (
        <BlogPreview background={background} content={content} title={title} />
      )}
    </main>
  );
}
