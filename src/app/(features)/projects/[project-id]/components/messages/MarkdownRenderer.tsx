import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
   content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
   content,
}) => {
   return (
      <div className="prose max-w-none">
         <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
         </ReactMarkdown>
      </div>
   );
};
