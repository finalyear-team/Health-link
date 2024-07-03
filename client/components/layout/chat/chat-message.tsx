import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ChatMessagesProps {
  messages: { text: string; time: string; type?: string; content?: string }[];
  messageResponse: {
    text: string;
    time: string;
    type?: string;
    content?: string;
  }[];
  handleImageClick: (imageSrc: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  messageResponse,
  handleImageClick,
  messagesEndRef,
}) => {
  return (
    <div className="flex h-[calc(100vh-200px)] flex-col gap-4 overflow-y-auto pr-2">
      <AnimatePresence>
        {messageResponse.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-8 w-8 border-2 border-[#00b894]">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="max-w-[70%] space-y-2">
                <div className="bg-[#f1f5f9] p-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-50 rounded-tl-md rounded-tr-md rounded-br-md">
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {msg.time}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-start gap-4 justify-end">
              <div className="max-w-[70%] space-y-2">
                <div
                  className="bg-secondary-600 w-fit max-w-56 h-fit p-3 text-sm text-gray-50 rounded-tl-md rounded-tr-md rounded-bl-md"
                  style={{ wordWrap: "break-word" }}
                >
                  {msg.text}
                  {msg.type === "image" && msg.content !== undefined && (
                    <Image
                      src={msg.content}
                      alt="Preview"
                      width={8}
                      height={8}
                      layout="responsive"
                      className="mb-2 cursor-pointer"
                      onClick={() => handleImageClick(msg.content!)}
                    />
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                  {msg.time}
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
