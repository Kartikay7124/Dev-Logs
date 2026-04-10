"use client";

import { useMemo } from "react";

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  const renderedContent = useMemo(() => {
    // Process the markdown content
    let html = content;

    // Process code blocks first (before other transformations)
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (_, lang, code) => {
        const language = lang || "text";
        return `<div class="relative my-6 rounded-lg bg-secondary overflow-hidden">
          <div class="flex items-center justify-between border-b border-border bg-secondary/80 px-4 py-2">
            <span class="text-xs font-medium text-muted-foreground">${language}</span>
          </div>
          <pre class="overflow-x-auto p-4"><code class="text-sm font-mono text-foreground">${escapeHtml(code.trim())}</code></pre>
        </div>`;
      }
    );

    // Process inline code (but not within already processed code blocks)
    html = html.replace(
      /`([^`]+)`/g,
      '<code class="bg-secondary px-1.5 py-0.5 rounded text-primary text-sm font-mono">$1</code>'
    );

    // Process headings
    html = html.replace(
      /^# (.+)$/gm,
      '<h1 class="text-3xl md:text-4xl font-bold text-foreground mt-10 mb-6 first:mt-0">$1</h1>'
    );
    html = html.replace(
      /^## (.+)$/gm,
      '<h2 class="text-2xl md:text-3xl font-semibold text-foreground mt-10 mb-4">$1</h2>'
    );
    html = html.replace(
      /^### (.+)$/gm,
      '<h3 class="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3">$1</h3>'
    );
    html = html.replace(
      /^#### (.+)$/gm,
      '<h4 class="text-lg font-semibold text-foreground mt-6 mb-2">$1</h4>'
    );

    // Process bold and italic
    html = html.replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-semibold text-foreground">$1</strong>'
    );
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

    // Process links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Process blockquotes
    html = html.replace(
      /^> (.+)$/gm,
      '<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">$1</blockquote>'
    );

    // Process unordered lists
    html = html.replace(/^- (.+)$/gm, '<li class="ml-6 list-disc mb-2">$1</li>');
    html = html.replace(
      /(<li class="ml-6 list-disc mb-2">[\s\S]*?<\/li>\n?)+/g,
      '<ul class="my-4 space-y-1">$&</ul>'
    );

    // Process ordered lists
    html = html.replace(
      /^\d+\. (.+)$/gm,
      '<li class="ml-6 list-decimal mb-2">$1</li>'
    );

    // Process paragraphs (lines that aren't already HTML)
    html = html
      .split("\n\n")
      .map((paragraph) => {
        const trimmed = paragraph.trim();
        if (
          !trimmed ||
          trimmed.startsWith("<") ||
          trimmed.startsWith("```")
        ) {
          return trimmed;
        }
        // Don't wrap if it's a list item or already processed
        if (
          trimmed.startsWith("<li") ||
          trimmed.startsWith("<ul") ||
          trimmed.startsWith("<ol") ||
          trimmed.startsWith("<h") ||
          trimmed.startsWith("<blockquote") ||
          trimmed.startsWith("<div")
        ) {
          return trimmed;
        }
        return `<p class="text-muted-foreground leading-relaxed mb-4">${trimmed}</p>`;
      })
      .join("\n\n");

    return html;
  }, [content]);

  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
