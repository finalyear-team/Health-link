"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  author: string;
}

const posts = [
  {
    title: "Understanding Diabetes",
    description:
      "A comprehensive guide to managing and understanding diabetes.",
    date: "June 10, 2024",
    author: "Dr. John Doe",
  },
  {
    title: "Heart Health Tips",
    description: "Effective tips to maintain a healthy heart.",
    date: "June 5, 2024",
    author: "Dr. John Doe",
  },
  {
    title: "Nutrition and Wellness",
    description: "How nutrition plays a crucial role in overall wellness.",
    date: "June 1, 2024",
    author: "Dr. John Doe",
  },
];

const MyPosts = ({ value }: { value: string }) => {
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <span className="text-primary-700 font-medium">My Posts</span>
          <hr />
        </CardHeader>
        <CardContent className="flex space-x-2 ">
          {posts.map((post, index) => (
            <Card key={index} className="max-w-sm my-4">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.description}</p>
              </CardContent>
              <CardFooter>
                <span>{post.date}</span>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  );
};
export default MyPosts;
