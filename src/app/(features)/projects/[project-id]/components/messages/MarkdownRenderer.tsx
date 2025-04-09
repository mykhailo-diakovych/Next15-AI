import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";

interface MarkdownRendererProps {
   content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
   content,
}) => {
   const remarkPlugins = [
      remarkGfm, // GitHub Flavored Markdown
      remarkBreaks, // Better line break handling
      remarkMath, // LaTeX math equations
   ];

   const rehypePlugins = [
      rehypeSanitize, // HTML sanitization
      rehypeKatex, // LaTeX rendering
      rehypeHighlight, // Code syntax highlighting
      rehypeSlug, // Add IDs to headings
   ];

   return (
      <div className="prose max-w-none text-base font-normal text-black-bean/90">
         <ReactMarkdown
            remarkPlugins={remarkPlugins}
            rehypePlugins={rehypePlugins}
         >
            {content}
         </ReactMarkdown>
      </div>
   );
};
