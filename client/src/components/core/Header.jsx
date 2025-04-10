import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full bg-black text-white px-4 py-2 flex justify-between">
      <Link to={"/"}>Blog Post</Link>
      <Link to={"/login"}>Login/Signup</Link>
    </div>
  );
};

export default Header;
