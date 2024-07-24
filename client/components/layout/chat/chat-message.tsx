import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import compareDates, { parseDate } from "@/utils/Helper";
import { format } from "date-fns";

interface ChatMessagesProps {
  messages: { text: string; time: string; type?: string; content?: string; sender?: string }[];
  messageResponse: {
    text: string;
    time: string;
    type?: string;
    content?: string;
    sender?: string;
  }[];
  selectedChat: any
  user: string | null
  handleImageClick: (imageSrc: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  selectedChat,
  messages,
  messageResponse,
  handleImageClick,
  user,
  messagesEndRef,
}) => {
  // Merge and sort messages
  const allMessages = [...messages, ...messageResponse].sort((a, b) =>
    compareDates(a.time, b.time)
  );

  console.log(selectedChat)

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col gap-4 overflow-y-auto pr-2">
      <AnimatePresence>
        {allMessages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className={`flex items-start gap-4 ${msg.sender === user ? 'justify-end' : ''}`}>
              {msg.sender !== user && (
                <Avatar className="h-8 w-8 border-2 border-[#00b894]">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>{`${selectedChat && selectedChat.Member?.FirstName?.slice(0, 1).toUpperCase()}`}</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[70%] space-y-2 ${msg.sender === user ? 'text-right' : ''}`}>
                <div
                  className={`p-3 text-sm rounded-md ${msg.sender === user ? 'bg-secondary-600 text-gray-50 rounded-tl-md rounded-tr-md rounded-bl-md' : 'bg-[#f1f5f9] text-gray-900 dark:bg-gray-800 dark:text-gray-50 rounded-tl-md rounded-tr-md rounded-br-md'}`}
                >
                  {msg.text}
                  {msg.content && (
                    <Image
                      src={msg.content}
                      alt="Preview"
                      width={200}
                      height={200}
                      layout="responsive"
                      className="mb-2 cursor-pointer"
                      onClick={() => handleImageClick(msg.content || "")}
                    />
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {format(parseDate(msg.time), "hh:mm")}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
