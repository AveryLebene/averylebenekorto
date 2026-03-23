"use client";

import parse, { type DOMNode } from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

function getTextContent(node: DOMNode): string {
  if (!node) return "";
  if (typeof node === "object" && "type" in node && node.type === "text" && "data" in node) {
    return (node as { data: string }).data;
  }
  if (typeof node === "object" && "children" in node && Array.isArray((node as { children: DOMNode[] }).children)) {
    return (node as { children: DOMNode[] }).children.map(getTextContent).join("");
  }
  return "";
}

function replaceCodeBlocks(domNode: DOMNode) {
  if (
    typeof domNode !== "object" ||
    !("name" in domNode) ||
    domNode.name !== "pre" ||
    !("attribs" in domNode) ||
    !domNode.attribs?.class?.includes("portfolio-code")
  ) {
    return;
  }
  const children = "children" in domNode && Array.isArray(domNode.children) ? (domNode as { children: DOMNode[] }).children : [];
  const codeChild = children.find(
    (c) => typeof c === "object" && c !== null && "name" in c && (c as { name: string }).name === "code"
  );
  const code = codeChild ? getTextContent(codeChild) : "";
  const language = (domNode as { attribs?: { "data-language"?: string } }).attribs?.["data-language"] || "text";
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      PreTag="div"
      codeTagProps={{ className: "portfolio-code-inner" }}
      customStyle={{
        margin: "1rem 0",
        borderRadius: "0.5rem",
        padding: "1rem",
        fontSize: "0.875rem",
        lineHeight: 1.6,
        background: "#1a1a1a",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
      showLineNumbers={false}
    >
      {code}
    </SyntaxHighlighter>
  );
}

/**
 * Renders article HTML (from extractArticleContentRich) with syntax-highlighted code blocks.
 * Only use with server-controlled, sanitized HTML.
 */
export default function ArticleContent({
  contentHtml,
  className = "",
}: {
  readonly contentHtml: string;
  readonly className?: string;
}) {
  return (
    <div className={`article-content ${className}`}>
      {parse(contentHtml, { replace: replaceCodeBlocks })}
    </div>
  );
}
