import React from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import NavLinks from "./NavLinks";

export default function MainNavigation({ props }) {
  return (
    <header className="flex p-2 h-15 items-center gap-3 bg-red-500 text-white justify-between">
      <div className='flex md:ml-4 gap-1 items-center'>
        <button className="text-4xl block md:hidden cursor-pointer hover:text-amber-100">
          <IoMdMenu />
        </button>
        <Link to="/">
          <h1 className="text-2xl font-semibold">YourPlaces</h1>
        </Link>
      </div>
      <nav>
        <NavLinks />
      </nav>
    </header>
  );
}
