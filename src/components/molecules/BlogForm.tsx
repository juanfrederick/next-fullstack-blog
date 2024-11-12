"use client";
import React, { SetStateAction, useCallback } from "react";
import InputField from "../atoms/InputField";
import TextArea from "../atoms/TextArea";
import { postContentType } from "@/interface/interface";
import RemoveIcon from "../icon/RemoveIcon";
import { useRouter } from "next/navigation";

interface Props {
  background: string;
  setBackground: React.Dispatch<SetStateAction<string>>;
  isUseBackground: boolean;
  setIsUseBackground: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<SetStateAction<string>>;
  content: postContentType[];
  setContent: React.Dispatch<SetStateAction<postContentType[]>>;
}

const BlogForm = ({
  background,
  setBackground,
  isUseBackground,
  setIsUseBackground,
  title,
  setTitle,
  content,
  setContent,
}: Props) => {
  const router = useRouter();

  const titleChangeHander = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  const backgroundChangeHander = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBackground(e.target.value);
    },
    [setBackground]
  );

  const handlerAddContent = (type: "header" | "text" | "image") => {
    setContent([...content, { type, content: "" }]);
  };

  const handlerChangeContent = useCallback(
    (index: number, value: string) => {
      setContent((prevContent) => {
        const newContent = [...prevContent];
        newContent[index].content = value;

        return newContent;
      });
    },
    [setContent]
  );

  const handlerRemoveContent = useCallback(
    (index: number) => {
      setContent((prevContent) => {
        const newContent = prevContent.filter(
          (_, arrIndex) => arrIndex !== index
        );
        return newContent;
      });
    },
    [setContent]
  );

  const handlerCancel = () => {
    router.push("/");
  };

  return (
    <section className="flex flex-col items-center p-6 gap-8">
      <h1 className="text-3xl font-bold">Write Blogs</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 items-center">
          <button
            className={`btn btn-sm btn-outline ${
              isUseBackground ? "btn-error" : "btn-primary"
            }`}
            onClick={() => setIsUseBackground(!isUseBackground)}
          >
            {isUseBackground ? "Remove Post Background" : "Add Post Background"}
          </button>
          <InputField
            id="input-title"
            onChange={titleChangeHander}
            type="string"
            value={title}
            label="Title"
            variant="labeled"
            placeholder="Insert Post Title"
            responsive
          />
          {isUseBackground && (
            <InputField
              id="input-background"
              onChange={backgroundChangeHander}
              type="input-background"
              value={background}
              label="Background Image"
              variant="labeled"
              placeholder="Insert Image Link"
              responsive
            />
          )}
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-lg font-semibold">Content:</h2>
          <div className="flex gap-4">
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => handlerAddContent("header")}
            >
              Add Header
            </button>
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => handlerAddContent("text")}
            >
              Add Text
            </button>
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => handlerAddContent("image")}
            >
              Add Image
            </button>
          </div>
          {content.map((val, index) => {
            const generateCloseButton = () => {
              return (
                <button
                  className="btn-xs btn btn-circle btn-outline btn-error"
                  onClick={() => handlerRemoveContent(index)}
                >
                  <RemoveIcon />
                </button>
              );
            };

            if (val.type === "header") {
              return (
                <InputField
                  id={`input-header-${index}`}
                  onChange={(e) => handlerChangeContent(index, e.target.value)}
                  type="text"
                  value={val.content}
                  label="Header"
                  variant="labeled"
                  placeholder="Insert Post Header"
                  key={index}
                  hasCloseButton={generateCloseButton()}
                  responsive
                />
              );
            } else if (val.type === "text") {
              return (
                <TextArea
                  label="Text"
                  value={val.content}
                  placeholder="Insert Post Text"
                  onChange={(e) => handlerChangeContent(index, e.target.value)}
                  key={index}
                  hasCloseButton={generateCloseButton()}
                  responsive
                />
              );
            } else if (val.type === "image") {
              return (
                <InputField
                  id={`input-header-${index}`}
                  onChange={(e) => handlerChangeContent(index, e.target.value)}
                  type="text"
                  value={val.content}
                  label="Image"
                  variant="labeled"
                  placeholder="Insert Image Link"
                  key={index}
                  hasCloseButton={generateCloseButton()}
                  responsive
                />
              );
            }
          })}
        </div>
      </div>
      <div className="flex gap-4">
        <button className="btn btn-error btn-sm" onClick={handlerCancel}>
          Cancel
        </button>
        <button className="btn btn-primary btn-sm">Save</button>
      </div>
    </section>
  );
};

export default BlogForm;
