"use client";

import { useState } from "react";
import Head from "next/head";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PostCard from "@/components/layout/feed-card";

const PostSchema = Yup.object().shape({
  content: Yup.string().required("Required"),
  image: Yup.mixed().nullable(),
});

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "This is a sample post.",
      image: null,
      likes: 0,
      comments: ["Great post!", "Nice!"],
    },
  ]);

  const addPost = (values: any) => {
    setPosts([
      ...posts,
      { id: posts.length + 1, ...values, likes: 0, comments: [] },
    ]);
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Social Media Platform</title>
      </Head>
      <div className="mb-4">
        <Formik
          initialValues={{ content: "", image: null }}
          validationSchema={PostSchema}
          onSubmit={(values, { resetForm }) => {
            addPost(values);
            resetForm();
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <Field
                name="content"
                as="textarea"
                className="w-full p-2 border rounded"
                placeholder="What's on your mind?"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }
                }}
                className="mt-2"
              />
              <button
                type="submit"
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Post
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
