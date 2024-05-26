"use client";

import { useState } from "react";
import QuestionCard from "@/components/layout/question-card";
import PostForm from "@/components/form/feed/page";
import ProfileHeader from "@/components/layout/profile-header";

const initialQuestions = [
  {
    id: "1",
    title: "How to use React with TypeScript?",
    description:
      "I am new to TypeScript and want to integrate it with my React project.",
    tags: ["React", "TypeScript", "JavaScript"],
    author: "John Doe",
    date: "May 20, 2024",
  },
  {
    id: "2",
    title: "How to use Nextjs with Tailwind?",
    description:
      "I am new to TypeScript and want to integrate it with my React project.",
    tags: ["React", "TypeScript", "JavaScript"],
    author: "John Doe",
    date: "May 20, 2024",
  },
  // Add more questions here
];

const HomePage = () => {
  const [questions, setQuestions] = useState(initialQuestions);

  const handlePostSubmit = (title: string, content: string, tags: string[]) => {
    const newQuestion = {
      id: (questions.length + 1).toString(),
      title,
      description: content,
      tags,
      author: "Current User",
      date: new Date().toLocaleDateString(),
    };
    setQuestions([newQuestion, ...questions]);
  };

  return (
    <div className="min-h-screen flex space-x-3 bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Forum</h1>
        <PostForm onSubmit={handlePostSubmit} />
        {questions.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>
      <div className="flex flex-col max-w-lg p-4 border border-slate-200 shadow-sm dark:border-slate-500 rounded-lg sticky dark:bg-slate-900">
        <h1 className="text-xl font-bold mb-4">Featured Doctors</h1>
        <div className="flex flex-col items-start space-y-2">
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
