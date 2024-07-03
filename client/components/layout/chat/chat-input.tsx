import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "@/components/ui/button";
import { Paperclip, Smile } from "lucide-react";

interface ChatInputProps {
  handleSend: (
    value: { message: string; fileAttach?: File | null },
    { resetForm }: { resetForm: () => void }
  ) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const ChatInput: React.FC<ChatInputProps> = ({ handleSend, fileInputRef }) => {
  return (
    <Formik initialValues={{ message: "", fileAttach: null }} onSubmit={handleSend}>
      {({ isValid, setFieldValue }) => (
        <Form className="" action="#" method="POST">
          <div className="w-full flex items-center gap-2 border-t border-gray-200 pt-4 dark:border-gray-800">
            <Field
              name="message"
              placeholder="Type your message..."
              className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus:ring-primary-600 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
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
            <Button type="submit" disabled={!isValid} className="bg-secondary-600 text-gray-50 hover:bg-secondary-700">
              Send
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
              <Paperclip className="h-5 w-5 text-secondary-600" />
              <span className="sr-only">Attach File</span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChatInput;
