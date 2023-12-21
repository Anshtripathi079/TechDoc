import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="flex justify-between mb-24">
      <Link to="/" className="font-bold text-2xl">
        TechTonic
      </Link>
      <div className="flex gap-4">
        <Link to="/login" className="cursor-pointer">
          Login
        </Link>
        <Link to="/register" className="cursor-pointer">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Header;
