import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WysiwygForm: React.FC = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow-sm bg-white dark:bg-slate-950">
      <ReactQuill value={content} onChange={handleContentChange} />
      <Button onClick={() => alert(content)} className="mt-3">
        Add a Question
      </Button>
    </div>
  );
};

export default WysiwygForm;
