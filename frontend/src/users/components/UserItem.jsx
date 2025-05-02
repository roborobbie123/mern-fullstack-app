import React from "react";
import { Link } from "react-router-dom";

export default function UserItem({ id, name, image, placeCount }) {
  return (
    <li className="m-5">
      <div className="flex items-center">
        <Link
          to={`/${id}/places`}
          className="group hover:bg-amber-300 bg-gray-700 rounded-lg
           text-white hover:text-black transition-colors flex items-center px-3 w-70
           shadow-2xl"
        >
          <div className="p-5">
            <img
              className="rounded-full h-20 w-20 border-1 object-cover"
              src={`http://localhost:4000/${image}`}
            />
          </div>
          <div>
            <h2 className="text-lg text-amber-300 group-hover:text-black transition-colors">
              {name}
            </h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </div>
    </li>
  );
}
