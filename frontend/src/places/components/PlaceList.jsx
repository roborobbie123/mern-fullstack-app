import React from "react";
import PlaceItem from "./PlaceItem";
import { Link } from "react-router-dom";

export default function PlaceList({ places }) {
  return (
    <div>
      {!places || places.length === 0 ? (
        <div className="mt-20 flex flex-col items-center text-white gap-5">
          <h2 className="text-2xl">No places found. Maybe create one?</h2>
          <button className="border ml-2 py-1 px-5 text-center text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-md shadow-lg disabled:bg-gray-600 disabled:text-gray-400">
            <Link to="/places/new">Share Place</Link>
          </button>
        </div>
      ) : (
        <ul className="flex flex-col items-center mx-auto my-10 h-full">
          {places.map((place) => (
            <PlaceItem
              key={place.id}
              id={place.id}
              image={place.image}
              title={place.title}
              description={place.description}
              address={place.address}
              creatorId={place.creator}
              coordinates={place.location}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
