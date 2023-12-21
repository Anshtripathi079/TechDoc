import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    console.log(username);
    e.preventDefault();
    toast.success("Submit");
    if (!username || !password) {
      toast.error("Fill all the fields");
      return;
    }
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.status === 200) {
      toast.success("registration successful");
    } else {
      toast.error("registration failed");
    }
  };

  return (
    <div className="w-96 m-auto mt-48 shadow-lg rounded-lg p-10">
      <Toaster />
      <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="enter username"
          className="border-2 p-2"
          required
          autoComplete="username"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="border-2 p-2"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        ></input>
        <button
          type="submit"
          className="p-1.5 rounded-md mt-4 mb-2 font-semibold text-md bg-[#072541] text-white"
        >
          Register
        </button>
        <p className="text-sm text-gray-400 mt-1">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
