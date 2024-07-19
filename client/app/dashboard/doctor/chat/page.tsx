// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { format } from "date-fns";
// import RecentChats from "@/components/layout/chat/chat-list";
// import ChatHeader from "@/components/layout/chat/chat-header";
// import ChatMessages from "@/components/layout/chat/chat-message";
// import ChatInput from "@/components/layout/chat/chat-input";
// import Modal from "@/components/test/modalImage";

// const Chat = () => {
//   const [messages, setMessages] = useState<
//     { text: string; time: string; type?: string; content?: string }[]
//   >([]);
//   const [messageResponse, setMessageResponse] = useState<
//     { text: string; time: string; type?: string; content?: string }[]
//   >([]);
//   const [previewImage, setPreviewImage] = useState<string | undefined>();
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [isUploadingImage, setIsUploadingImage] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalImageSrc, setModalImageSrc] = useState<string>("");

//   interface FormValues {
//     message: string;
//     fileAttach?: File | null;
//   }

//   const handleSend = (
//     value: FormValues,
//     { resetForm }: { resetForm: () => void }
//   ) => {
//     const currentTime = format(new Date(), "HH:mm a");

//     // For text messages
//     if (value.message.trim()) {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: value.message, time: currentTime },
//       ]);
//     }

//     // For image messages
//     if (value.fileAttach) {
//       setIsUploadingImage(true);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             text: "",
//             time: currentTime,
//             type: "image",
//             content: reader.result as string,
//           },
//         ]);
//         setPreviewImage(reader.result as string);
//         setIsUploadingImage(false);
//       };
//       reader.readAsDataURL(value.fileAttach);
//     }
//     resetForm();
//   };

//   // Scroll to the bottom when new messages are added
//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, messageResponse]);

//   // Open the modal when the image is clicked
//   const handleImageClick = (imageSrc: string) => {
//     setModalImageSrc(imageSrc);
//     setIsModalOpen(true);
//   };

//   // Close the modal when any place is clicked
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="flex w-full flex-col dark:bg-gray-950">
//       <div className="flex h-full ">
//         <RecentChats />
//         <div className="flex-1 mb-2 mx-2 dark:bg-slate-950">
//           <ChatHeader />
//           <ChatMessages
//             messages={messages}
//             messageResponse={messageResponse}
//             handleImageClick={handleImageClick}
//             messagesEndRef={messagesEndRef}
//           />
//           <ChatInput handleSend={handleSend} fileInputRef={fileInputRef} />
//         </div>
//       </div>
//       <Modal
//         showModal={isModalOpen}
//         imageSrc={modalImageSrc}
//         onClose={closeModal}
//       />
//     </div>
//   );
// };

// export default Chat;
"use client";

import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
// import Cookies from 'universal-cookie';

import {
  ChannelListContainer,
  ChannelContainer,
  // Auth,
} from "@/components/chat";

import "stream-chat-react/dist/css/index.css";
// import "./App.css";

// const cookies = new Cookies();

const apiKey = "rbktr6anv6v9";
// const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

// if (authToken) {
//   client.connectUser(
//     {
//       id: cookies.get("userId"),
//       name: cookies.get("username"),
//       fullName: cookies.get("fullName"),
//       image: cookies.get("avatarURL"),
//       hashedPassword: cookies.get("hashedPassword"),
//       phoneNumber: cookies.get("phoneNumber"),
//     },
//     authToken
//   );
// }

const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
