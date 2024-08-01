import { FC, useState } from "react";
import Link from "next/link";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Share,
  Ellipsis,
  Flag,
  MessageCircleQuestion,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProfileHeader from "@/components/layout/profile-header";
import useAuth from "@/hooks/useAuth";
import { UserType } from "@/types/types";
import { useMutation, useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Form, Formik } from "formik";
import { Input } from "../ui/input";
import WysiwygForm from "../form/WYSWYG/WysiwygForm";
import { handleHtmlContent } from "@/utils/EditorImageUploader";
import { CREATE_FORUM_ANSWER } from "@/graphql/mutations/forumMutations";
import { GET_FORUM_ANSWER } from "@/graphql/queries/forumQueries";

interface QuestionCardProps {
  UserID: string;
  Title: string;
  Question: string;
  ForumPostID: string;
  // tags: string[];
  Author: any;
  CreatedAt: Date;
}

const QuestionCard: FC<QuestionCardProps> = ({
  UserID,
  Title,
  Question,
  ForumPostID,
  // tags,
  Author,
  CreatedAt,
}) => {
  let sanitizeHtml;
  if (Question) {
    sanitizeHtml = DOMPurify.sanitize(Question);
  }
  const [activeVote, setActiveVote] = useState<"up" | "down" | null>(null);
  const { user } = useAuth();

  const Role = user?.Role === UserType.DOCTOR ? "doctor" : "patient";

  const [open, setOpen] = useState(false)


  const { data: getForumAnsers, loading, error, refetch } = useQuery(GET_FORUM_ANSWER, {
    variables: {
      ForumPostID: ForumPostID
    }
  })
  const [editorContent, setEditorContent] = useState("");

  const [createForumAnswerPost] = useMutation(CREATE_FORUM_ANSWER)

  const handleEditorContentChange = (content: string) => {
    setEditorContent(content);
  };

  const handleVoteUp = () => {
    setActiveVote((prev) => (prev === "up" ? null : "up"));
  };

  const handleVoteDown = () => {
    setActiveVote((prev) => (prev === "down" ? null : "down"));
  };

  const handleAnswerSubmit = async (values: any) => {
    try {
      const html = await handleHtmlContent(editorContent)
      if (!html && !values.title)
        return
      createForumAnswerPost({
        variables: {
          input: {
            Answer: html,
            ForumPostID: ForumPostID,
            UserID: user?.UserID
          }
        }
      })


    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-600 shadow-sm rounded-lg p-4 mb-4">
      <ProfileHeader
        profilePicture="https://via.placeholder.com/150"
        name={`${Author?.Role === UserType.DOCTOR && "Dr"}  ${Author?.FirstName} ${Author?.LastName}`}
        isVerified={true}
        username={`${Author?.Username}`}
        userType={Author?.Role}
        postTime={CreatedAt}
      />
      <Link href={`/dashboard/${Role}/forum/${ForumPostID}`} className="md:font-bold ">
        {Title}
      </Link>
      {/* content  */}
      <div
        className="text-sm "
        dangerouslySetInnerHTML={{ __html: sanitizeHtml ? sanitizeHtml?.substring(0, 30) + "...." : "" }}
      ></div>

      <div className="flex justify-between items-center mt-4 ">
        <span className="text-xs dark:text-slate-200 text-slate-800">
          {/* {CreatedAt.toISOString()} */}
        </span>
      </div>

      {/* interactions */}
      <div className="flex justify-between items-center mt-4">
        <TooltipProvider>
          {/* vote up and down */}
          <div className="flex items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"empty"}
                  className={`p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 ${activeVote === "up"
                    ? "text-primary-600 dark:text-primary-700 bg-slate-100 dark:bg-slate-800"
                    : ""
                    }`}
                  onClick={handleVoteUp}
                >
                  21 <ArrowBigUp className="w-5 h-5 ml-1" /> UpVote
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Vote Up</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"empty"}
                  className={`p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 ${activeVote === "down"
                    ? "text-primary-600 dark:text-primary-700 bg-slate-100 dark:bg-slate-800"
                    : ""
                    }`}
                  onClick={handleVoteDown}
                >
                  <ArrowBigDown className="w-5 h-5 mr-1" /> 14
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Vote Down</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {/* answers */}
          <div>


            <Dialog>
              <DialogTrigger asChild>

                <Button
                  variant={"empty"}
                  className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <MessageCircle className="w-5 h-5 mr-1" /> 4
                </Button>

              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
                <div className="space-y-6 p-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Answers</h2>
                    <div className="divide-y">
                      <div className="py-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10 shrink-0 rounded-full">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">John Doe</p>
                              <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                            <div className="prose text-muted-foreground">
                              <p>
                                Airplane turbulence occurs when the plane encounters pockets of air that are moving
                              </p>
                              <p>
                                The air around the plane is constantly moving, and sometimes it can create areas of turbulence.

                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 justify-end">
                  <DialogFooter>
                    <Button type="submit">Answer</Button>
                  </DialogFooter>
                  <DialogClose asChild><Button type="button" variant={"outline"}>Close</Button></DialogClose>
                </div>
              </DialogContent>
            </Dialog>

          </div>
          {/* answer button if the role is provider(doctor) */}



          {/* <Dialog open={open} onOpenChange={setOpen}> */}
          <Dialog >
            <DialogTrigger asChild>
              <Button variant={"ghost"} size={"sm"}>
                Answer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <span className="flex items-center">
                  <MessageCircleQuestion className="w-5 h-5 mr-2" /> Answer the
                  Question.
                </span>
              </DialogHeader>
              <Formik initialValues={{ title: "" }} onSubmit={handleAnswerSubmit}>
                {({ isValid, isSubmitting }) => (
                  <div>
                    <Form className="p-2" action="#" method="POST">

                      <WysiwygForm onContentChange={handleEditorContentChange} />
                      <Button
                        className="z-50"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Add a Question
                      </Button>
                    </Form>
                  </div>
                )}
              </Formik>
            </DialogContent>
          </Dialog>

        </TooltipProvider>
      </div>
    </div>
  );
};

export default QuestionCard;
