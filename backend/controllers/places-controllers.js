const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
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
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!place) {
    return next(new HttpError("Could not find place with that id.", 404));
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((place) => place.creator === userId);

  if (!places || places.length === 0) {
    return next(new HttpError("Could not find places with that user id.", 404));
  }

  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { id, title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlaces = DUMMY_PLACES.map((place) =>
    place.id === placeId
      ? {
          ...place,
          title,
          description,
        }
      : place
  );

  res.status(200).json({ places: updatedPlaces });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  const updatedPlaces = DUMMY_PLACES.filter((place) => place.id !== placeId);
  res.status(200).json({ places: updatedPlaces });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
