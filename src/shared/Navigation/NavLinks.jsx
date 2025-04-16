import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks() {
    const linkStyle = 'hover:bg-amber-300 hover:text-black px-1 rounded-md';

  return (
    <ul className="gap-3 text-md hidden md:flex mr-5">
      <li className={linkStyle}>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      <li className={linkStyle}>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li>
      <li className={linkStyle}>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
      <li className={linkStyle}>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
}
