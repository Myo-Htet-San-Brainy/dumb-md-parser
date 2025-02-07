"use client";
import React, { useEffect, useRef } from "react";
import { useMarkdownState } from "./lib/state";
import { saveToLocalStorage } from "./utils/localStorage";
import ReactMarkdown from "react-markdown";
import { main } from "./utils/Markdownparser";

const Page: React.FC = () => {
  const { content, changeContent } = useMarkdownState();
  const editableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editableRef.current) editableRef.current.innerText = content;
  }, []);

  useEffect(() => {
    // console.log("saving to local", content);
    saveToLocalStorage("content", content);
  }, [content]);
  return (
    <div>
      <div className="flex h-screen">
        {/* Editor */}
        <div
          ref={editableRef}
          className="w-[50%] bg-sky-300 p-10"
          contentEditable={true}
          onInput={(e: React.FormEvent<HTMLDivElement>) => {
            const md = e.currentTarget.innerHTML
              .replace(/<div>/g, "\n")
              .replace(/<\/div>/g, "")
              .replace(/<br>/g, "\n")
              .replace(/&nbsp;/g, " ");
            console.log("innerHTML", e.currentTarget.innerHTML);
            // console.log("textcontent", e.currentTarget.textContent);
            // console.log(
            //   e.currentTarget.innerHTML
            //     .replace(/<div>/g, "\n")
            //     .replace(/<\/div>/g, "")
            //     .replace(/<br>/g, "\n")
            //     .replace(/&nbsp;/g, " ")
            // );

            changeContent(md);
          }}
        ></div>

        {/* Preview */}
        <div className="w-[50%] bg-amber-300 p-10">
          {recursive(main(content))}
        </div>
        {/* <ReactMarkdown className="w-[50%] bg-amber-300 p-10">
          {content}
        </ReactMarkdown> */}
      </div>
    </div>
  );
};

function recursive(content: [any]): any {
  const result = content?.map(
    (item: string | Record<"type" | "content", any>, index) => {
      if (typeof item === "string") {
        return <span key={index}>{item}</span>;
      }
      if (typeof item === "object" && item.type === "heading1") {
        return (
          <h1 className="text-xl" key={index}>
            {recursive(item["content"])}
          </h1>
        );
      }
      if (typeof item === "object" && item.type === "block") {
        return <p key={index}>{recursive(item["content"])}</p>;
      }
      if (typeof item === "object" && item.type === "bold") {
        return (
          <span key={index} className="font-bold">
            {recursive(item["content"])}
          </span>
        );
      }
    }
  );
  return result;
}

export default Page;
