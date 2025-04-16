import React from "react";

import UsersList from "../components/UsersList";

export default function Users() {
  const USERS = [
    { id: "u1", name: "Robert Barrett", image: null, placeCount: 5 },
    { id: "u2", name: "Bro Dude", image: null, placeCount: 2 },
    { id: "u3", name: "Lebron James", image: null, placeCount: 23 },
  ];

  return (
    <div>
      <UsersList items={USERS} />
    </div>
  );
}
