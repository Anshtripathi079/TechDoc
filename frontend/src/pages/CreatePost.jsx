import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const createNewPost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/createpost", data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Post Created Successfully");
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block border mb-2 w-full px-2 py-3 rounded-sm"
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="block border mb-2 w-full px-2 py-3 rounded-sm"
      />
      <input
        type="file"
        border
        className="block mb-2 w-full px-2 py-3 rounded-sm"
        onChange={(e) => setFiles(e.target.files)}
      />
      <ReactQuill
        modules={modules}
        value={content}
        onChange={(value) => setContent(value)}
      />
      <button type="submit">Create Post</button>
      <Toaster />
    </form>
  );
};

export default CreatePost;
