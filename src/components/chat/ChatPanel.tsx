import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import ChatMessage from "./ChatMessage";
import ProductCard from "./ProductCard";

interface ProductData {
  id: number;
  name: string;
  slug: string;
  category: string;
  material: string | null;
  shortDesc: string | null;
  imageUrl: string | null;
  priceHint: string | null;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: ProductData[];
  isStreaming?: boolean;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Good day. I am Delta Assistant, representing Delta Industries — trophy and awards manufacturers since 1998 in Jalandhar. How may I assist you with your recognition needs?",
};

// ─── Smart chip generator ─────────────────────────────────────────────────

function generateChips(lastMessage: string): string[] {
  if (!lastMessage) return [];

  // Don't show chips if the AI gave a definitive answer without asking anything
  const asksQuestion = /[?]/.test(lastMessage);
  const offersOptions = /\b(would you like|let me know|shall i|may i|can i help|how may i|what would you|which one|interested in)\b/i.test(lastMessage);
  const isFinalAnswer = /\b(hope this helps|that covers|those are|this is the|thank you for|feel free to reach|contact us directly|submitted successfully)\b/i.test(lastMessage);

  if (isFinalAnswer && !asksQuestion) return [];

  if (!asksQuestion && !offersOptions) return [];

  const chips: string[] = [];

  if (/\b(wooden|wood)\b/i.test(lastMessage)) chips.push("Show me more wooden trophies");
  if (/\b(acrylic)\b/i.test(lastMessage)) chips.push("What acrylic awards do you have");
  if (/\b(metal|gold|silver)\b/i.test(lastMessage)) chips.push("Show metal cup options");
  if (/\b(crystal)\b/i.test(lastMessage)) chips.push("Tell me about crystal trophies");
  if (/\b(plastic|economy|budget|cheap|affordable)\b/i.test(lastMessage)) chips.push("Browse budget-friendly options");
  if (/\b(medal)\b/i.test(lastMessage)) chips.push("What medals are available");
  if (/\b(shield|plaque)\b/i.test(lastMessage)) chips.push("Shields and plaques details");
  if (/\b(corporate|gift|executive)\b/i.test(lastMessage)) chips.push("Corporate gift options");
  if (/\b(price|pricing|quote|cost|rupees|rs)\b/i.test(lastMessage)) chips.push("Get a price estimate");
  if (/\b(order|ordering|enquiry|enquire|buy|purchase)\b/i.test(lastMessage)) chips.push("Submit an enquiry");
  if (/\b(custom|personalize|engrav|logo)\b/i.test(lastMessage)) chips.push("How does customization work");
  if (/\b(manufacturing|process|facility|made)\b/i.test(lastMessage)) chips.push("Tell me about your facility");
  if (/\b(delivery|shipping|timeline)\b/i.test(lastMessage)) chips.push("What is the delivery timeline");

  // If no specific chips detected, generate a couple of generic ones
  if (chips.length === 0) {
    if (asksQuestion) {
      chips.push("Tell me more");
    }
    if (offersOptions) {
      chips.push("Show me the options");
    }
  }

  // Max 3 chips
  return chips.slice(0, 3);
}

// ─── Component ────────────────────────────────────────────────────────────

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPanel = ({ isOpen, onClose }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatMutation = trpc.ai.chat.useMutation();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", isStreaming: true },
    ]);

    try {
      const conversationMessages = [...messages, userMessage]
        .filter((m) => !m.isStreaming && m.id !== "welcome")
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

      const result = await chatMutation.mutateAsync({
        messages: conversationMessages,
      });

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: result.content, isStreaming: false, products: result.products as ProductData[] | undefined }
            : m
        )
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "";
      const isRateLimit = errorMsg.includes("Rate limit") || errorMsg.includes("429");
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: isRateLimit
                ? "One moment please — the server is processing a high volume of requests. Please wait a few seconds and try again."
                : "I am unable to respond at the moment. Please try again or contact us at info@deltaindustries.in or call 08048954176.",
              isStreaming: false }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant" && !m.isStreaming);
  const chips = lastAssistantMsg ? generateChips(lastAssistantMsg.content) : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-[440px] h-[calc(100vh-7rem)] max-h-[750px] bg-[#ffffe3] border border-[#35020D]/15 rounded-sm shadow-2xl flex flex-col overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="shrink-0 px-5 py-4 border-b border-[#35020D]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center border border-[#35020D]/30 rounded-sm">
                <span className="text-[#35020D] font-bold text-lg leading-none">Δ</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#35020D] tracking-wide">Delta Assistant</div>
                <div className="text-[10px] text-[#35020D]/50 font-medium tracking-wide uppercase">Online</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#35020D]/50 hover:text-[#35020D] transition-colors rounded-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={msg.id}>
                <ChatMessage message={msg} isLast={i === messages.length - 1 && isLoading} />
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {msg.products.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex items-center gap-2 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#35020D]/30 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#35020D]/30 animate-pulse" style={{ animationDelay: "0.15s" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#35020D]/30 animate-pulse" style={{ animationDelay: "0.3s" }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Smart Chips — single scrollable row, only when relevant */}
          {!isLoading && chips.length > 0 && (
            <div className="shrink-0 px-5 py-2.5 border-t border-[#35020D]/5 overflow-x-auto flex gap-2 chips-scroll">
              {chips.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(chip)}
                  className="shrink-0 text-xs font-medium text-[#35020D]/70 border border-[#35020D]/20 rounded-full px-3.5 py-1.5 hover:bg-[#35020D]/5 hover:text-[#35020D] hover:border-[#35020D]/40 transition-colors whitespace-nowrap"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="shrink-0 p-4 border-t border-[#35020D]/10">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 resize-none bg-[#35020D]/5 rounded-sm px-3 py-2.5 text-sm text-[#35020D] placeholder-[#35020D]/40 outline-none focus:bg-[#35020D]/8 transition-colors font-sans"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className="shrink-0 w-9 h-9 flex items-center justify-center rounded-sm bg-[#35020D] text-[#ffffe3] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1a0107] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatPanel;
