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
  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Line breaks
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
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
