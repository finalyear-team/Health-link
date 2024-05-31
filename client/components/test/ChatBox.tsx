"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Formik, Form } from "formik";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = (value: any, { setSubmitting, resetForm }: any) => {
    if (value.message.trim()) {
      setMessages([...messages, value.message]);
      setInput("");
      resetForm();
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-slate-50 dark:bg-slate-800 shadow-lg rounded-lg">
      <div className="flex-grow overflow-y-auto mb-4 p-2 bg-slate-200 dark:bg-slate-700 rounded-lg">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 mb-2 bg-blue-100 dark:bg-slate-500 rounded-lg shadow"
            >
              {msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={handleSend}
        // validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="mt-8 space-y-4" action="#" method="POST">
            <div className="flex">
              <Input
                type="text"
                name="message"
                placeholder="Type a message..."
              />
              <Button type="submit" disabled={!isValid}>
                Send
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChatBox;
