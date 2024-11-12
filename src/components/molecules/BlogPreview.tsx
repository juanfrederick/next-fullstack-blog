import { postContentType } from "@/interface/interface";
import generateCurrentDate from "@/lib/generateCurrentDate";
import React from "react";

interface Props {
  title: string;
  background: string;
  content: postContentType[];
}

const BlogPreview = ({ title, background, content }: Props) => {
  return (
    <section>
      <div
        className={`bg-fixed bg-cover bg-center w-full h-40 md:h-52 bg-primary-content`}
        style={{ backgroundImage: background ? `url(${background})` : "" }}
      ></div>
      <div className="px-6 md:px-36 py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          <p>{generateCurrentDate()} - username</p>
        </div>
        {content && (
          <article>
            {content.map((val, index) => {
              if (val.type === "header") {
                return (
                  <h2 className="text-lg md:text-xl font-semibold">
                    {val.content}
                  </h2>
                );
              } else if (val.type === "text") {
                return (
                  <p className="whitespace-pre-line mb-4">{val.content}</p>
                );
              } else if (val.type === "image") {
                return (
                  <img
                    className="mx-auto my-4 md:w-1/2"
                    src={val.content}
                    alt={`Image for ${title}`}
                  />
                );
              }
            })}
          </article>
        )}
      </div>
    </section>
  );
};

export default BlogPreview;
