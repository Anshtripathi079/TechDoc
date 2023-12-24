import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import parse from "html-react-parser";
const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const getPost = async () => {
    const res = await axios.get("http://localhost:4000/post/" + id);
    setPost(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      {post && (
        <div>
          <img
            src={"http://localhost:4000/" + post?.cover}
            className="sm:max-h-52 md:max-h-80 lg:max-h-96 w-full object-center "
          />

          <p className="text-sm text-gray-400 mt-2">
            {post?.author?.username}/{" "}
            {post?.createdAt &&
              format(new Date(post?.createdAt), "MMM d, yyyy HH:mm")}
          </p>
          <h1 className="text-3xl font-bold mt-8">{post?.title}</h1>
          <p className="mt-8 text-lg">
            {post?.content && parse(post?.content)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
