"use client";

import { useState } from "react";
import QuestionCard from "@/components/layout/question-card";
import PostForm from "@/components/form/feed/page";
import ProfileHeader from "@/components/layout/profile-header";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircleQuestion } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Formik, Form } from "formik";
import WysiwygForm from "@/components/form/WYSWYG/WysiwygForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { parse, format } from 'date-fns';


const initialQuestions = [
  {
    id: "1",
    title: "How to use React with TypeScript?",
    description:
      "I am new to TypeScript and want to integrate it with my React project.",
    tags: ["React", "TypeScript", "JavaScript"],
    author: "John Doe",
    date: new Date("May 20, 2024"),
  },
  {
    id: "2",
    title: "How to use Nextjs with Tailwind?",
    description:
      "I am new to TypeScript and want to integrate it with my React project.",
    tags: ["React", "TypeScript", "JavaScript"],
    author: "John Doe",
    date: new Date("May 20, 2024"),
  },
  // Add more questions here
];

interface Tab {
  name: string;
}

const tabs: Tab[] = [
  { name: "Latest" },
  { name: "Recent" },
  { name: "Popular" },
  { name: "Trending" },
];

const HomePage = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [activeTab, setActiveTab] = useState<string>(tabs[0].name);

  const [editorContent, setEditorContent] = useState("");

  const handleEditorContentChange = (content: string) => {
    setEditorContent(content);
  };

  const handlePostSubmit = (title: string, content: string, tags: string[]) => {
    const newQuestion = {
      id: (questions.length + 1).toString(),
      title,
      description: content,
      tags,
      author: "Current User",
      date: new Date(),
    };
    setQuestions([newQuestion, ...questions]);
  };

  const handleSearch = () => {
    // Handle search functionality
  };

  return (
    <div className="relative flex flex-col items-center justify-center space-y-2">
      <div className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950">
        <div className="flex items-center justify-between p-1">
          <h1 className="text-xl font-bold">Forum</h1>
          <Formik initialValues={{ searchText: "" }} onSubmit={handleSearch}>
            {() => (
              <Form className="" action="#" method="POST">
                <Input
                  type="text"
                  name="searchText"
                  placeholder="Search questions"
                  className="w-[350px]"
                />
              </Form>
            )}
          </Formik>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Ask Question
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <span className="flex items-center">
                  <MessageCircleQuestion className="w-5 h-5 mr-2" /> Ask a
                  Question.
                </span>
              </DialogHeader>
              <WysiwygForm onContentChange={handleEditorContentChange} />
              <Button
                className="z-50"
                disabled={!editorContent}
                onClick={() => {
                  console.log(editorContent);
                }}
              >
                Add a Question
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex space-x-4 mt-2">
            {tabs.map((tab) => (
              <Button
                variant={"empty"}
                size={"sm"}
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`hover:bg-slate-100 dark:hover:bg-slate-800 rounded-none transition-colors duration-300 ${activeTab === tab.name
                    ? "border-b-4 border-primary-600 dark:border-primary-700 text-primary-600 dark:text-primary-700"
                    : ""
                  }`}
              >
                {tab.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-full flex flex-wrap space-x-6 p-2">
        <div className="max-w-4xl mx-auto mb-2">
          {/* <PostForm onSubmit={handlePostSubmit} /> */}
          {questions.map((question) => (
            <QuestionCard key={question.id} {...question} />
          ))}
        </div>
        <div className="flex flex-col max-w-lg p-4 border border-slate-200 shadow-sm dark:border-slate-500 rounded-lg sticky dark:bg-slate-950">
          <h1 className="text-xl font-bold mb-4">Featured Doctors</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
