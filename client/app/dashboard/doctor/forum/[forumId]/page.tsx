// pages/question/[id].tsx
"use client"
import { useRouter } from "next/navigation";
import QuestionDetail from "@/components/layout/question-detail";
import { useQuery } from "@apollo/client";
import { GET_FORUM_ANSWER, GET_FORUM_POST } from "@/graphql/queries/forumQueries";

const question = {
  title: "How to use React with TypeScript?",
  description:
    "I am new to TypeScript and want to integrate it with my React project. Can anyone provide some guidance?",
  tags: ["React", "TypeScript", "JavaScript"],
  author: "John Doe",
  date: "May 20, 2024",
  answers: [
    {
      author: "Jane Smith",
      content:
        "You can start by creating a new project with Create React App using the TypeScript template.",
      date: "May 21, 2024",
    },
    // Add more answers here
  ],
};

const QuestionPage = ({ params }: { params: { forumId: string } }) => {
  const router = useRouter()
  const id = params.forumId;
  const { data: GetForumPost, loading, error } = useQuery(GET_FORUM_POST, {
    variables: {
      ForumPostID: id
    }
  })

  const { data: ForumPostAnswer } = useQuery(GET_FORUM_ANSWER, {
    variables: {
      ForumPostID: id
    }
  })

  console.log(ForumPostAnswer?.GetForumAnswers)
  if (error || !GetForumPost?.GetForumPost)
    <div>Error loading contents</div>




  console.log(GetForumPost?.GetForumPost)


  return (
    <div className="min-h-full p-4">
      <div className="max-w-4xl mx-auto">
        <QuestionDetail Answers={GetForumPost?.GetForumPost} {...GetForumPost?.GetForumPost} />
      </div>
    </div>
  );
};

export default QuestionPage;
