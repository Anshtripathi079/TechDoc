import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      if (res.status == 200) {
        console.log(res);
        console.log("Logged in");
        toast.success("logged in successfully");
        setUserInfo(res?.data);
        navigate("/");
      }
    } catch (err) {
      toast.error("wrong credentials");
      console.log(err);
    }
  };
  return (
    <div className="w-96 m-auto mt-48 shadow-lg rounded-lg p-10">
      <form className="flex flex-col mt-4 gap-3 " onSubmit={handleSubmit}>
        <label htmlFor="email">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="enter username"
          className="border-2 p-2"
          required
          autoComplete="username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={username}
        ></input>
        <label htmlFor="uname">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="enter password"
          className="border-2 p-2"
          required
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        ></input>
        <button
          type="submit"
          className="p-1.5 rounded-md mt-4 mb-2 font-semibold text-md bg-[#072541] text-white"
        >
          Login
        </button>
        <p className="text-sm text-gray-400 mt-1">
          Dont have a account?{" "}
          <Link to="/register" className="text-blue-600 cursor-pointer">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
