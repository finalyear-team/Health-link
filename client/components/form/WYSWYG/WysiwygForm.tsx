import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    ["bold", "italic", "underline"], // Basic styling
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["link", "image"], // Link and image
    ["clean"], // Remove formatting
  ],
};

const formats = [
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link",
  "image",
];
interface WysiwygFormProps {
  onContentChange: (content: string) => void;
}

const WysiwygForm: React.FC<WysiwygFormProps> = ({ onContentChange }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (value: string) => {
    setContent(value);
    // passing to the parent element
    onContentChange(value);
  };

  return (
    <div className="">
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        theme="snow"
        className="h-72 mb-12"
        placeholder="Type your question here..."
      />
    </div>
  );
};

export default WysiwygForm;
