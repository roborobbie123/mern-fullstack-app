import React from "react";

import UsersList from "../components/UsersList";
import RobertBarrett from '../../assets/RobertBarrett.jpeg'
import lebron from '../../assets/lebron.png'
import spongebob from '../../assets/spongebob.png'

export default function Users() {
  const USERS = [
    { id: "u1", name: "Robert Barrett", image: RobertBarrett, placeCount: 5 },
    { id: "u2", name: "Spongebob", image: spongebob, placeCount: 2 },
    { id: "u3", name: "Lebron James", image: lebron, placeCount: 23 },
  ];

  return (
    <div>
      <UsersList items={USERS} />
    </div>
  );
}
