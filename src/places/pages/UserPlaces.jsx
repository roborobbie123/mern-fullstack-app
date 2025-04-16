import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import empireState from '../../assets/empire_state.jpeg'


const DUMMY_PLACES = [
    {
      id: "p1",
      title: "Empire State Building",
      description: "One of the most famous skyscrapers in the world",
      image: empireState,
      address: "20 W 34th St., New York, NY 10001",
      location: [40.7484, 73.9857],
      creator: "u1",
    },
    {
      id: "p2",
      title: "Empire State Building",
      description: "One of the most famous skyscrapers in the world",
      image: empireState,
      address: "20 W 34th St., New York, NY 10001",
      location: [40.7484, 73.9857],
      creator: "u2",
    },
  ];

export default function UserPlaces() {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

  return <PlaceList places={loadedPlaces} />;
}
