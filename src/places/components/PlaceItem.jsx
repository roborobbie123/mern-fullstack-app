import React from "react";
import { useState } from "react";
import Modal from "../../shared/Modal";
import Map from "../../shared/Map";

export default function PlaceItem({
  id,
  image,
  title,
  description,
  address,
  creator,
  coordinates,
}) {
  const [showMap, setShowMap] = useState(false);

  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  const buttonStyle = "border px-2 py-1 rounded-sm shadow-xl cursor-pointer";

  return (
    <>
      <Modal
        show={showMap}
        onCancel={handleCloseMap}
        header={address}
        footer={
          <button className="cursor-pointer" onClick={handleCloseMap}>
            CLOSE
          </button>
        }
      >
        <div className="h-full w-full">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <li className="my-5 w-120 h-3/5 bg-white text-center rounded-md">
        <div>
          <img src={image} className="w-full h-75 rounded-t-md" />
        </div>
        <div className="p-2">
          <h2 className="text-2xl font-semibold my-1">{title}</h2>
          <h3 className="font-semibold my-1">{address}</h3>
          <p className="my-1">{description}</p>
        </div>
        <div className="flex gap-2 justify-center mb-8 mt-4 text-md">
          <button
            onClick={handleOpenMap}
            className={`${buttonStyle} text-red-500 hover:bg-red-500 hover:text-white`}
          >
            VIEW ON MAP
          </button>
          <button
            className={`${buttonStyle} bg-red-500 text-white hover:bg-white hover:text-red-500`}
          >
            EDIT
          </button>
          <button
            className={`${buttonStyle} text-white bg-red-900 hover:bg-white hover:text-red-900`}
          >
            DELETE
          </button>
        </div>
      </li>
    </>
  );
}
