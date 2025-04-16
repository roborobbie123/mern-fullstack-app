import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks() {
  const linkStyle = "hover:bg-amber-300 hover:text-black p-1 rounded-md";

  return (
    <ul className="md:gap-3 flex-col text-md flex mr-5 md:flex-row sm:flex-col gap-5 items-center">
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${linkStyle} bg-amber-300 text-black` : linkStyle
          }
          to="/"
        >
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${linkStyle} bg-amber-300 text-black` : linkStyle
          }
          to="/u1/places"
        >
          MY PLACES
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${linkStyle} bg-amber-300 text-black` : linkStyle
          }
          to="/places/new"
        >
          ADD PLACE
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${linkStyle} bg-amber-300 text-black` : linkStyle
          }
          to="/auth"
        >
          AUTHENTICATE
        </NavLink>
      </li>
    </ul>
  );
}
