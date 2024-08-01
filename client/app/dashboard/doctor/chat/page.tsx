
"use client";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import RecentChats, { RecentChat } from "@/components/layout/chat/chat-list";
import ChatHeader from "@/components/layout/chat/chat-header";
import ChatMessages from "@/components/layout/chat/chat-message";
import ChatInput from "@/components/layout/chat/chat-input";
import Modal from "@/components/test/modalImage";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GET_CHANNELS, GET_CHATS } from "@/graphql/queries/chatChannelQueries";
import client from "@/graphql/apollo-client";
import { io, Socket } from "socket.io-client";
import useSocket from "@/hooks/useSocket";
import { uploadFile } from "@/utils/fileUpload";
import { toast } from "@/components/ui/use-toast";
import Loading from "@/common/Loader/Loading";

const Chat = () => {
  const [messages, setMessages] = useState<
    { text: string; time: string; type?: string; content?: string; channelId?: string; sender?: string }[]
  >([]);
  const [messageResponse, setMessageResponse] = useState<
    { text: string; time: string; type?: string; content?: string; channelId?: string; sender?: string }[]
  >([]);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [progress, setProgress] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>("");
  const { user } = useAuth();
  const socket = useSocket(user?.UserID)
  const [selectedChat, setSelectedChat] = useState<any>();
  const [recentChats, setRecentChats] = useState<RecentChat[] | null>(null);

  const { data: userChannel, loading, error } = useQuery(GET_CHANNELS, {
    variables: {
      userID: user?.UserID,
    },
  });

  console.log(socket)

  useEffect(() => {
    if (!userChannel?.userChannel) return;
    setRecentChats(
      userChannel.userChannel.map((channel: any) => ({
        Member: channel.Members[0],
        ...channel,
      }))
    );
  }, [userChannel?.userChannel]);

  useEffect(() => {
    console.log("haha")
    if (!socket || !selectedChat) return;

    socket.emit("join-room", {
      userId: user?.UserID,
      roomId: selectedChat?.ChannelID,
    });
    const handleReceiveMessage = (message: any) => {
      console.log("Received message:", message);
      console.log(selectedChat.ChannelID);

      if (message.channelId === selectedChat?.ChannelID && message.sender !== user?.UserID) {
        setMessageResponse((prevMessages) => {
          // Check if the message is already in the state
          const isMessageExists = prevMessages.some(
            (msg) =>
              msg.text === message.text &&
              msg.sender === message.sender &&
              msg.time === message.timestamp &&
              msg.channelId === message.channelId &&
              msg.content === message.content
          );

          // Only update the state if the message is new
          if (!isMessageExists) {
            return [
              ...prevMessages,
              {
                sender: message.sender,
                text: message.text,
                time: message.timestamp,
                channelId: message.channelId,
                content: message.content
              },
            ];
          }

          return prevMessages;
        });
      }
    };
    ;

    socket.on("receive-message", handleReceiveMessage);

    const fetchChatMessages = async () => {
      try {
        const { data } = await client.query({
          query: GET_CHATS,
          variables: {
            userID: user?.UserID,
            ChannelID: selectedChat?.ChannelID,
          },
        });

        setMessageResponse(data?.getChats?.filter((chat: any) => chat?.SenderID !== user?.UserID).map((chat: any) => ({
          sender: chat.SenderID,
          text: chat.Content,
          time: chat.SentAt,
          channelId: chat.ChannelID,
          content: chat.MediaUrl
        })))

        setMessages(data?.getChats?.filter((chat: any) => chat?.SenderID === user?.UserID).map((chat: any) => ({
          sender: chat.SenderID,
          text: chat.Content,
          time: chat.SentAt,
          channelId: chat.ChannelID,
          content: chat.MediaUrl
        })))



        console.log("Fetched chat messages:", data);
      } catch (error) {
        console.log("Error fetching chat messages:", error);
      }
    };
    fetchChatMessages();

    return () => {

      socket.emit("leave-room", {
        userId: user?.UserID,
        roomId: selectedChat?.ChannelID,
      });
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [selectedChat, socket, user?.UserID]);



  const sendMessage = (message: any) => {
    if (!socket || !socket.connected || !selectedChat?.ChannelID) return;
    socket.emit("send-message", {
      ...message,
      recipientId: selectedChat.Member.UserID,
      channelId: selectedChat.ChannelID,
    });
  };

  const handleSend = async (
    value: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!selectedChat) return;

    const currentTime = format(new Date(), "HH:mm a");

    const message = {
      sender: user?.UserID,
      text: value.message,
      timestamp: new Date().toISOString(),
      channelId: selectedChat.ChannelID,
    };

    console.log(message)

    if (value.message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: user?.UserID,
          text: value.message,
          time: new Date().toISOString(),
          channelId: selectedChat.ChannelID
        },
      ]);

      sendMessage(message);
    }



    // Handle file attachment (image)
    if (value.fileAttach) {
      console.log("file attach")
      try {
        const content = await uploadFile(value.fileAttach, "ChatImages", setProgress)
        console.log(content)
        setIsUploadingImage(true);
        const reader = new FileReader();

        reader.onloadend = () => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: "",
              time: new Date().toISOString(),
              type: "image",
              content: reader.result as string,
              channelId: selectedChat.ChannelID,
            },
          ]);
          setPreviewImage(reader.result as string);

        };
        console.log(content)
        sendMessage({ ...message, content: content });
        setIsUploadingImage(false);
        reader.readAsDataURL(value.fileAttach);
      } catch (error) {
        toast({
          title: "error uploading image",
          description: `error uploading image ${error}`,
          variant: "error",
        });

      }

    }
    resetForm();
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, messageResponse]);

  const handleImageClick = (imageSrc: string) => {
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (progress === 100)
      setProgress(null)

  }, [progress])
  console.log(progress)




  return (
    <div className="flex w-full flex-col dark:bg-gray-950">
      <div className="flex h-full ">
        <>{
          loading ? <Loading /> :
            <RecentChats recentChats={recentChats} selectChat={setSelectedChat} />}
        </>
        <div className="flex-1 mb-2 mx-2 dark:bg-slate-950">
          {selectedChat && (
            <>
              <ChatHeader selectedChat={selectedChat} />
              <div className="flex flex-col ">
                <ChatMessages
                  messages={messages.filter((msg) => msg.channelId === selectedChat?.ChannelID)}
                  messageResponse={messageResponse.filter(
                    (msg) => msg.channelId === selectedChat?.ChannelID && msg.sender !== user?.UserID
                  )}
                  user={user?.UserID}
                  selectedChat={selectedChat}
                  handleImageClick={handleImageClick}
                  messagesEndRef={messagesEndRef}
                />
                <div>
                  {
                    progress && <>
                      {progress}
                    </>
                  }
                </div>
              </div>
              <ChatInput handleSend={handleSend} fileInputRef={fileInputRef} />
            </>
          )}
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

export default Chat;
