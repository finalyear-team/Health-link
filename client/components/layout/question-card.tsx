import { FC, useState } from "react";
import Link from "next/link";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Share,
  Ellipsis,
  Flag,
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

interface QuestionCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  date: Date;
}

const QuestionCard: FC<QuestionCardProps> = ({
  id,
  title,
  description,
  tags,
  author,
  date,
}) => {
  const [activeVote, setActiveVote] = useState<"up" | "down" | null>(null);
  const { user } = useUser();
  const Role = user?.unsafeMetadata.role === "provider" ? "doctor" : "patient";

  const handleVoteUp = () => {
    setActiveVote((prev) => (prev === "up" ? null : "up"));
  };

  const handleVoteDown = () => {
    setActiveVote((prev) => (prev === "down" ? null : "down"));
  };
  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-600 shadow-sm rounded-lg p-4 mb-4">
      <ProfileHeader
        profilePicture="https://via.placeholder.com/150"
        name="Dr. John Doe"
        isVerified={true}
        username="johndoe"
        userType="Doctor"
        postTime={date}
      />
      <Link href={`/dashboard/${Role}/forum/${id}`} className="font-semibold ">
        {title}
      </Link>
      <p className="text-slate-700 dark:text-slate-50 mt-2">{description}</p>

      <div className="flex justify-between items-center mt-4 ">
        <span className="text-xs dark:text-slate-200 text-slate-800">
          {date.toLocaleDateString()}
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
                  className={`p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 ${
                    activeVote === "up"
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
                  className={`p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 ${
                    activeVote === "down"
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"empty"}
                  className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <MessageCircle className="w-5 h-5 mr-1" /> 4
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Answers</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {/* answer button if the role is provider(doctor) */}
          {Role === "doctor" ? (
            <Button variant={"ghost"} size={"sm"}>
              Answer
            </Button>
          ) : (
            ""
          )}
          {/* share and more */}
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"empty"}
                  className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Share className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>

            <Popover>
              <Tooltip>
                <PopoverTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"empty"}
                      className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Ellipsis className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                </PopoverTrigger>
                <TooltipContent>
                  <p>More</p>
                </TooltipContent>
              </Tooltip>
              <PopoverContent className="h-fit w-fit p-0">
                <Button variant={"ghost"}>
                  <Flag className="w-4 h-4 mr-1" /> Report
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default QuestionCard;
