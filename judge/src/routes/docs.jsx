import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs')({
  component: AnotherPage
})

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Importing Markdown file directly (Vite / CRA)
// Adjust the path to your .md file
import docFile from "../../scrapped_docs/react_dev_learn_1763314554021.md";

export default function DocsPage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(docFile)
      .then((res) => res.text())
      .then((txt) => setContent(txt))
      .catch(() => setContent("# Error loading documentation"));
  }, []);

  return (
    <div className="w-full min-h-screen p-10">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
