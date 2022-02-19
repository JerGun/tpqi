import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  useEffect(() => {}, [location]);
  return (
    <nav
      className={
        "fixed top-0 h-16 w-full z-10 flex px-10 space-x-10 items-center shadow-lg text-gray-600 bg-white"
      }
    >
      <div className="relative h-full flex items-center hover:text-black">
        <Link to="/" className={`h-full w-full px-5 flex items-center`}>
          Home
        </Link>
        {location.pathname === "/" ? (
          <span className="absolute h-1 w-full bottom-0 left-0 rounded-t-lg bg-blue-600"></span>
        ) : null}
      </div>
      <div className="relative h-full flex items-center hover:text-black">
        <Link to="/add" className={`h-full w-full px-5 flex items-center`}>
          Add
        </Link>
        {location.pathname === "/add" ? (
          <span className="absolute h-1 w-full bottom-0 left-0 rounded-t-lg bg-blue-600"></span>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
