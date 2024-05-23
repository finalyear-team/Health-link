
import { FC } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h1 className="text-2xl font-semibold text-blue-600">{title}</h1>
      <p className="text-gray-700 mt-4">{description}</p>
      <div className="flex flex-wrap mt-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">Asked by {author}</span>
        <span className="text-sm text-gray-600">{date}</span>
      </div>
      <div className="my-6">
        <h2 className="text-xl font-semibold">Answers</h2>
        {answers.map((answer, index) => (
          <div key={index} className="bg-gray-50 p-4 mt-4 rounded-lg">
            <p className="text-gray-700">{answer.content}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">
                Answered by {answer.author}
              </span>
              <span className="text-sm text-gray-600">{answer.date}</span>
            </div>
          </div>
        ))}
      </div>
      <Button>
        <Link href={"/dashboard/patient/forum"} className="flex">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Questions
        </Link>
      </Button>
    </div>
  );
};

export default QuestionDetail;
