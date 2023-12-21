import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import axios from "axios";
const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/profile", {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.username !== "") {
        setUser(res.data.username);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:4000/logout", null, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUser(null);
        navigate("/login");
      } else {
        console.error(`Unexpected status code: ${res.status}`);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex justify-between mb-24">
      <Link to="/" className="font-bold text-2xl">
        TechTonic
      </Link>
      <div className="flex gap-4">
        {user && (
          <>
            <Link to="/create">Create new post</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="cursor-pointer">
              Login
            </Link>
            <Link to="/register" className="cursor-pointer">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
