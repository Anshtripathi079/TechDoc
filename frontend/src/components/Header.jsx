import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import axios from "axios";
import { UserContext } from "../UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/profile", {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.username !== "") {
        setUserInfo(res?.data?.username);
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
        setUserInfo(null);
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
        {userInfo && (
          <>
            <Link to="/create">Create new post</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </>
        )}

        {!userInfo && (
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
