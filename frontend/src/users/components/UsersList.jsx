import React from "react";

import UserItem from "./UserItem";

export default function UsersList({ items }) {
  return (
    <div className="flex justify-center mt-10">
      {!items || items.length === 0 ? (
        <h2 className='text-white mt-5'>No users found.</h2>
      ) : (
        <ul className="flex flex-col mt-5">
          {items.map((user) => (
            <UserItem
              key={user.id}
              id={user.id}
              image={user.image}
              name={user.name}
              placeCount={user.placeCount}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
