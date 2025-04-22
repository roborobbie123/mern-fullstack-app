import React from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const linkStyle = "hover:bg-amber-300 hover:text-black p-1 rounded-md";

export default function NavLinks() {
  const navigator = useNavigate();
  const auth = useContext(AuthContext);

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
      {auth.isLoggedIn && (
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
      )}
      {auth.isLoggedIn && (
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
      )}
      {!auth.isLoggedIn &&  <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${linkStyle} bg-amber-300 text-black` : linkStyle
          }
          to="/auth"
        >
          AUTHENTICATE
        </NavLink>
      </li>}
      {auth.isLoggedIn && (<li>
        <button onClick={() => {
          auth.logout();
          navigator("/auth")
          }} className={linkStyle}>LOG OUT</button>
        </li>)}
      
     
    </ul>
  );
}
