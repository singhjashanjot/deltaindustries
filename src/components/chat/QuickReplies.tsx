interface QuickRepliesProps {
  replies: string[];
  onSelect: (reply: string) => void;
}

const QuickReplies = ({ replies, onSelect }: QuickRepliesProps) => {
  if (replies.length === 0) return null;

  return (
    <div className="shrink-0 px-5 py-3 border-t border-[#35020D]/5 flex flex-wrap gap-2 overflow-x-auto">
      {replies.map((reply, i) => (
        <button
          key={i}
          onClick={() => onSelect(reply)}
          className="shrink-0 text-xs font-medium text-[#35020D]/70 border border-[#35020D]/20 rounded-full px-3.5 py-1.5 hover:bg-[#35020D]/5 hover:text-[#35020D] hover:border-[#35020D]/40 transition-colors whitespace-nowrap"
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
