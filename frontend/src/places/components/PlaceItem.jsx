import React from "react";
import { useState } from "react";
import Modal from "../../shared/Modal";
import Map from "../../shared/Map";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/auth-context";
import { useContext } from "react";
import useHttpClient from "../../shared/http-hook";
import { useNavigate } from "react-router-dom";

export default function PlaceItem({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
  onDelete,
}) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const deletePlace = async () => {
    try {
      await sendRequest(`http://localhost:4000/api/places/${id}`, "DELETE", null, {
        Authorization: "Bearer " + auth.token,
      });
      onDelete(id);
    } catch (error) {
      console.log(error);
    }

    handleCloseDelete();
  };

  const buttonStyle = "border px-2 py-1 rounded-sm shadow-xl cursor-pointer";

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      {error && (
        <Modal
          header="An error has occurred"
          show={error}
          footer={
            <div>
              <button
                className="border w-20 py-1 text-center text-white bg-red-500 hover:bg-red-700 rounded-md shadow-lg cursor-pointer"
                onClick={clearError}
              >
                Back
              </button>
            </div>
          }
        >
          <p className="text-center mt-5">{error}</p>
        </Modal>
      )}
      <Modal
        show={showMap}
        onCancel={handleCloseMap}
        header={address}
        footer={
          <button
            className="cursor-pointer border w-20 py-1 text-center text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-md shadow-lg"
            onClick={handleCloseMap}
          >
            CLOSE
          </button>
        }
      >
        <div className="h-full w-full">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        header="Are you sure?"
        show={showDelete}
        footer={
          <div>
            <button
              onClick={handleCloseDelete}
              className="border w-20 py-1 text-center text-red-500 bg-white hover:bg-red-100 hover:text-black rounded-md shadow-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={deletePlace}
              className="border w-20 py-1 text-center text-white bg-red-500 hover:bg-red-700 rounded-md shadow-lg cursor-pointer"
            >
              Delete
            </button>
          </div>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that this
          action is final.
        </p>
      </Modal>
      <li className="my-5 w-120 h-3/5 bg-white text-center rounded-md">
        <div>
          <img
            src={`http://localhost:4000/${image}`}
            className="w-full h-75 rounded-t-md"
          />
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
          {auth.isLoggedIn && auth.userId === creatorId && (
            <>
              <Link to={`/places/${id}`}>
                <button
                  className={`${buttonStyle} bg-red-500 text-white hover:bg-white hover:text-red-500`}
                >
                  EDIT
                </button>
              </Link>
              <button
                className={`${buttonStyle} text-white bg-red-900 hover:bg-white hover:text-red-900`}
                onClick={handleShowDelete}
              >
                DELETE
              </button>
            </>
          )}
        </div>
      </li>
    </>
  );
}
