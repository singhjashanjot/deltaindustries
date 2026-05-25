import { useState } from "react";
import ChatFAB from "./ChatFAB";
import ChatPanel from "./ChatPanel";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatFAB onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatWidget;
