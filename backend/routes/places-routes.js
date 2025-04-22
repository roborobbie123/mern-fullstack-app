const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "EMPIRE STATE BUILDING",
    description: "Famous skyscraper",
    location: {
      lat: 41,
      lng: -74,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
  {
    id: "p2",
    title: "EMP",
    description: "Famous skyscraper",
    location: {
      lat: 41,
      lng: -74,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);
  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(place => place.creator === userId);
    res.json({ place })
})

module.exports = router;
