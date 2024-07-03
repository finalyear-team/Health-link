"use client";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import RecentChats from "@/components/layout/chat/chat-list";
import ChatHeader from "@/components/layout/chat/chat-header";
import ChatMessages from "@/components/layout/chat/chat-message";
import ChatInput from "@/components/layout/chat/chat-input";
import Modal from "@/components/test/modalImage";

const Chat = () => {
  const [messages, setMessages] = useState<
    { text: string; time: string; type?: string; content?: string }[]
  >([]);
  const [messageResponse, setMessageResponse] = useState<
    { text: string; time: string; type?: string; content?: string }[]
  >([]);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>("");

  interface FormValues {
    message: string;
    fileAttach?: File | null;
  }

  const handleSend = (
    value: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const currentTime = format(new Date(), "HH:mm a");

    // For text messages
    if (value.message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: value.message, time: currentTime },
      ]);
    }

    // For image messages
    if (value.fileAttach) {
      setIsUploadingImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "",
            time: currentTime,
            type: "image",
            content: reader.result as string,
          },
        ]);
        setPreviewImage(reader.result as string);
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(value.fileAttach);
    }
    resetForm();
  };

  // Scroll to the bottom when new messages are added
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, messageResponse]);

  // Open the modal when the image is clicked
  const handleImageClick = (imageSrc: string) => {
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  // Close the modal when any place is clicked
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full flex-col dark:bg-gray-950">
      <div className="flex h-full ">
        <RecentChats />
        <div className="flex-1 mb-2 mx-2 dark:bg-slate-950">
          <ChatHeader />
          <ChatMessages
            messages={messages}
            messageResponse={messageResponse}
            handleImageClick={handleImageClick}
            messagesEndRef={messagesEndRef}
          />
          <ChatInput handleSend={handleSend} fileInputRef={fileInputRef} />
        </div>
      </div>
      <Modal
        showModal={isModalOpen}
        imageSrc={modalImageSrc}
        onClose={closeModal}
      />
    </div>
  );
};

export default Chat
// "use client"
// import { tokenProvider } from '@/Services/streamChatServices';
// import { useUser } from '@clerk/nextjs';
// import React, { useEffect, useState } from 'react'
// import { StreamChat } from 'stream-chat';
// import {
//   Chat,
//   Channel,
//   ChannelList,
//   Window,
//   ChannelHeader,
//   MessageList,
//   MessageInput,
//   Thread,
//   useCreateChatClient,
//   ChannelListProps,
// } from 'stream-chat-react';
// import 'stream-chat-react/dist/css/v2/index.css';


// const apiKey = process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY as string

// const ChatPage = () => {
//   const [client, setClient] = useState<StreamChat>()
//   const { user } = useUser()
//   const [token, setToken] = useState()
//   const [filters, setFilter] = useState({ members: {}, type: "" })

//   const options = { presence: true, state: true };
//   const sort = { last_message_at: -1 };

//   console.log(user)
//   useEffect(() => {
//     const getToken = async () => {
//       if (!user)
//         return
//       const token = await tokenProvider()
//       console.log(token)
//       setToken(token)
//     }
//     getToken()

//   }, [user])
//   useEffect(() => {
//     const createClient = async () => {
//       if (!token || !user)
//         return
//       const client = StreamChat.getInstance(apiKey);
//       client.connectUser(
//         {
//           id: user?.id,
//         },
//         token
//       );
//       setFilter({ members: { $in: [user.id] }, type: 'messaging' });

//       setClient(client);

//       return () => client.disconnectUser();
//     }
//     createClient()
//   }, [token])

//   console.log(client)

//   if (!client) return <div>Loading...</div>;

//   return (
//     <Chat client={client}>
//       <ChannelList sort={sort as any} filters={filters as any} options={options} />
//       <Channel>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput />
//         </Window>
//         <Thread />
//       </Channel>
//     </Chat>
//   );
// }

// export default ChatPage