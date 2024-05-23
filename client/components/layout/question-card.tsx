// components/QuestionCard.tsx
import { FC } from "react";
import Link from "next/link";

interface QuestionCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  date: string;
}

const QuestionCard: FC<QuestionCardProps> = ({
  id,
  title,
  description,
  tags,
  author,
  date,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <Link
        href={`/dashboard/patient/forum/${id}`}
        className="text-xl font-semibold text-blue-600"
      >
        {title}
      </Link>
      <p className="text-gray-700 mt-2">{description}</p>
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
    </div>
  );
};

export default QuestionCard;
