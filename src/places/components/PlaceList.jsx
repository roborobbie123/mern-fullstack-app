import React from "react";
import PlaceItem from "./PlaceItem";

export default function PlaceList({ places }) {
  return (
    <div>
      {!places || places.length === 0 ? (
        <div className='mt-20 flex flex-col items-center text-white gap-5'>
          <h2 className='text-2xl'>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </div>
      ) : (
        <ul className='flex flex-col items-center mx-auto mt-10 h-screen'>
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
