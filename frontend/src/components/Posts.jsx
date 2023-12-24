import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts", {
      withCredentials: true,
    });
    console.log(res);
    setPosts(res?.data);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {posts?.map((post, index) => {
        return (
          <div
            id={post._id}
            className="flex flex-col md:flex-row justify-between gap-4 items-center mt-10 cursor-pointer"
          >
            <div className="w-full md:w-[60%] lg:w-[40%] ">
              <img
                src={"http://localhost:4000/" + post.cover}
                className="h-full object-cover object-center"
              />
            </div>

            <div className="w-full md:w-[50%] lg:w-[60%] p-4 flex flex-col gap-3 md:ml-8">
              <h2 className="font-semibold text-2xl">{post?.title}</h2>
              <p className="text-sm text-gray-400">
                {post?.author?.username}/{" "}
                {format(new Date(post.createdAt), "MMM d, yyyy HH:mm")}
              </p>
              <p>{post.summary}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
