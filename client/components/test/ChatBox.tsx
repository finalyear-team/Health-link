"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Formik, Form } from "formik";
import Image from "next/image";
import { format } from "date-fns";
import { SendHorizontal, Paperclip } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Modal from "@/components/test/modalImage";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<
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

    // for text messages
    if (value.message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: value.message, time: currentTime },
      ]);

      // Possible place for a database interaction to save the message
      // ({ text: value.message, time: currentTime });
    }

    // for image messages
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

        // Possible place for a database interaction to save the image
        // ({ content: reader.result, time: currentTime });

        setPreviewImage(reader.result as string);
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(value.fileAttach);
    }
    scrollToBottom();
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
  }, [messages]);

  // open the modal when the image is clicked
  const handleImageClick = (imageSrc: string) => {
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  // close the modal when anyplace is clicked
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-500 flex flex-col h-full p-4 mr-2 bg-slate-50 dark:bg-slate-800 rounded-md">
      <div className="flex flex-col">
        <div className="flex items-center">
          <Image
            src="/image/profile-picture.jpg"
            alt="doctor"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div className="flex items-start flex-col justify-between">
            <span className="font-bold">Dr. Joe Lam</span>
            <span className="text-sm text-primary-600 dark:text-primary-700">
              online
            </span>
          </div>
        </div>
        <hr className="my-2" />
      </div>
      <div className="relative h-[500px]">
        <div className="flex items-end flex-col absolute right-0 top-4 h-[450px] overflow-y-scroll pr-4 pb-3">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div
                  className="text-xs w-fit max-w-56 h-fit p-3 mb-2 text-slate-50 bg-primary-600 dark:bg-slate-500 rounded-tl-md rounded-tr-md rounded-bl-md shadow"
                  style={{ wordWrap: "break-word" }}
                >
                  {msg.text}
                  {msg.type === "image" && msg.content !== undefined && (
                    <Image
                      src={msg.content}
                      alt="Preview"
                      width={16}
                      height={16}
                      layout="responsive"
                      className="mb-2 cursor-pointer"
                      onClick={() => handleImageClick(msg.content!)}
                    />
                  )}
                </div>
                <div className="text-right text-xs mb-1 text-slate-500 dark:text-slate-300">
                  {msg.time}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        <Formik<FormValues>
          initialValues={{ message: "", fileAttach: null }}
          onSubmit={handleSend}
        >
          {({ isValid, setFieldValue }) => (
            <Form className="" action="#" method="POST">
              <div className="absolute bottom-0 w-full px-1 flex items-center justify-between border border-slate-200 dark:border-slate-500 bg-white dark:bg-slate-950 rounded">
                <Input
                  type="text"
                  name="message"
                  placeholder="Type a message..."
                  className="w-full border-0"
                />

                <div className="flex">
                  <input
                    name="fileAttach"
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      setFieldValue("fileAttach", file);
                    }}
                  />

                  <TooltipProvider>
                    {/* Attach file */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="mr-2"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Paperclip className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Attach file</p>
                      </TooltipContent>
                    </Tooltip>
                    {/* Send message or file */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button type="submit" disabled={!isValid}>
                          <SendHorizontal className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Send</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/* for showing an Image preview when the image is clicked */}
      <Modal
        showModal={isModalOpen}
        imageSrc={modalImageSrc}
        onClose={closeModal}
      />
    </div>
  );
};

export default ChatBox;
