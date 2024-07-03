"use client";

import { useState, FC } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

const PostCard = ({ post }: any) => {
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  const toggleLike = () => {
    setLikes((prevLikes: any) => (prevLikes === likes ? likes - 1 : likes + 1));
  };

  const addComment = () => {
    setComments([...comments, newComment]);
    setNewComment("");
  };

  const sharePost = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("URL copied to clipboard!");
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <p>{post.content}</p>
        {post.image && (
          <div className="mt-2">
            <Image
              src={URL.createObjectURL(post.image)}
              width={200}
              height={200}
              alt="Post image"
              className="w-full h-auto"
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mt-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="focus:outline-none" onClick={toggleLike}>
                  {likes} Likes
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Like</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="focus:outline-none"
                  onClick={() => setShowComments(!showComments)}
                >
                  Comments
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Comment</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="focus:outline-none" onClick={sharePost}>
                  Share
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      {showComments && (
        <CardFooter>
          <div className="mt-4">
            <div className="space-y-2">
              {comments.map((comment: any, index: any) => (
                <p key={index}>{comment}</p>
              ))}
            </div>
            <div className="mt-2 flex">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Add a comment..."
              />
              <button
                onClick={addComment}
                className="ml-2 p-2 bg-blue-500 text-white rounded"
              >
                Reply
              </button>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;
