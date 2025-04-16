import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";

export default function MainNavigation({ props }) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  function handleOpenDrawer() {
    setDrawerIsOpen(true);
  }
  function handleCloseDrawer() {
    setDrawerIsOpen(false);
  }

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={handleCloseDrawer} />}

      <SideDrawer show={drawerIsOpen}>
        <nav className="md:hidden absolute bg-white h-screen w-1/3 flex items-center justify-center rounded-sm">
          <NavLinks />
        </nav>
      </SideDrawer>

      <header className="flex p-2 h-15 items-center gap-3 bg-red-500 text-white justify-between">
        <div className="flex md:ml-4 gap-1 items-center">
          <button className="text-4xl block md:hidden cursor-pointer hover:text-amber-100">
            <IoMdMenu onClick={handleOpenDrawer} />
          </button>
          <Link to="/">
            <h1 className="text-2xl font-semibold">YourPlaces</h1>
          </Link>
        </div>
        <nav className="hidden md:flex">
          <NavLinks />
        </nav>
      </header>
    </>
  );
}
