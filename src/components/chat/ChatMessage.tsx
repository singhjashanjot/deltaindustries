import { useState, useEffect, useMemo } from "react";

interface MessageType {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

interface ChatMessageProps {
  message: MessageType;
  isLast: boolean;
}

function parseContent(text: string): string {
  let html = text
    // Bold: **text** or __text__
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    // Inline code
    .replace(/`(.+?)`/g, "<code class='text-xs bg-[#35020D]/10 px-1 rounded'>$1</code>")
    // Headers
    .replace(/^### (.+)$/gm, "<h4 class='text-sm font-semibold mt-3 mb-1'>$1</h4>")
    .replace(/^## (.+)$/gm, "<h3 class='text-base font-semibold mt-3 mb-1'>$1</h3>")
    .replace(/^# (.+)$/gm, "<h3 class='text-base font-semibold mt-3 mb-1'>$1</h3>")
    // Horizontal rules
    .replace(/^---$/gm, "<hr class='border-[#35020D]/10 my-2' />")
    // Unordered lists
    .replace(/^[*-] (.+)$/gm, "<li class='ml-4 list-disc'>$1</li>")
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, "<li class='ml-4 list-decimal'>$1</li>")
    // Line breaks
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>")
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li[^>]*>.*?<\/li><br\/>)+)/g, (match) => {
      const items = match.replace(/<br\/>/g, "").replace(/<br>/g, "");
      return `<ul class='space-y-0.5 my-2'>${items}</ul>`;
    });

  // Simple table parsing: | col1 | col2 |
  if (text.includes("|") && text.match(/^\|.+\|$/m)) {
    html = html
      .replace(/^\|(.+)\|$/gm, (row) => {
        const cells = row.split("|").filter(c => c.trim()).map(c => c.trim());
        const isHeader = cells.some(c => c.includes("**"));
        const tag = isHeader ? "th" : "td";
        const cellClass = isHeader ? "font-semibold text-left" : "";
        return `<tr>${cells.map(c => `<${tag} class='${cellClass} px-2 py-1 border-b border-[#35020D]/10 text-xs'>${c.replace(/\*\*/g, "")}</${tag}>`).join("")}</tr>`;
      })
      .replace(/((?:<tr>.*?<\/tr><br\/>)+)/g, (match) => {
        const rows = match.replace(/<br\/>/g, "").replace(/<br>/g, "");
        return `<table class='w-full my-2 border-collapse'>${rows}</table>`;
      });
  }

  return html;
}

const ChatMessage = ({ message, isLast }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const [displayedContent, setDisplayedContent] = useState(
    message.isStreaming ? "" : message.content
  );

  useEffect(() => {
    if (!message.isStreaming) {
      setDisplayedContent(message.content);
      return;
    }
    if (message.content && displayedContent.length < message.content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(message.content.slice(0, displayedContent.length + 3));
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [message.content, message.isStreaming, displayedContent]);

  useEffect(() => {
    if (!message.isStreaming) {
      setDisplayedContent(message.content);
    }
  }, [message.content, message.isStreaming]);

  const parsedHtml = useMemo(() => parseContent(displayedContent), [displayedContent]);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 rounded-sm text-sm leading-relaxed ${
          isUser
            ? "bg-[#35020D] text-[#ffffe3]"
            : "bg-[#35020D]/5 text-[#35020D] border-l-2 border-[#35020D]/20"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{displayedContent}</p>
        ) : (
          <div
            className="message-content text-sm"
            dangerouslySetInnerHTML={{ __html: parsedHtml }}
          />
        )}
        {message.isStreaming && (!message.content || displayedContent.length < message.content.length) && (
          <span className="inline-block w-1.5 h-4 bg-[#35020D]/40 ml-0.5 animate-pulse align-text-bottom" />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
