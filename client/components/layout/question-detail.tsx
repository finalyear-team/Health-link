"use client";

import { FC } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, MessageCircle, MessageCircleQuestion } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuestionDetailProps {
  title: string;
  description: string;
  tags: string[];
  author: string;
  date: string;
  answers: { author: string; content: string; date: string }[];
}

const QuestionDetail: FC<QuestionDetailProps> = ({
  title,
  description,
  tags,
  author,
  date,
  answers,
}) => {
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-600  shadow-sm rounded-lg p-6 mb-4">
      <div className="text-2xl font-semibold text-blue-600 flex items-center">
        <MessageCircleQuestion className="w-6 h-6 mr-2" />
        {title}
      </div>
      <p className="text-slate-700 dark:text-slate-50 mt-4">{description}</p>
      <div className="flex flex-wrap mt-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-slate-800 dark:text-slate-200">
          Asked by {author}
        </span>
        <span className="text-xs text-slate-800 dark:text-slate-200">
          {date}
        </span>
      </div>
      <div className="my-6">
        <div className="text-xl font-semibold flex items-center">
          <MessageCircle className="h-6 w-6 mr-2" /> Answers
        </div>
        {answers.map((answer, index) => (
          <div
            key={index}
            className="dark:bg-slate-800 bg-slate-100 p-4 mt-4 rounded-lg"
          >
            <p className="text-slate-800 dark:text-slate-100">
              {answer.content}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-slate-800 dark:text-slate-200">
                Answered by {answer.author}
              </span>
              <span className="text-xs text-slate-800 dark:text-slate-200">
                {answer.date}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Button>
    </div>
  );
};

export default QuestionDetail;
