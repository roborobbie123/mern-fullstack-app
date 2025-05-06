import React from "react";
import { useParams } from "react-router-dom";
import useHttpClient from "../../shared/http-hook";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../shared/auth-context";
import Modal from "../../shared/Modal";

import PlaceList from "../components/PlaceList";

export default function UserPlaces() {
  const auth = useContext(AuthContext);
  const [userPlaces, setUserPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchPlaces = async () => {
    try {
      const response = await sendRequest(
        `http://localhost:4000/api/places/user/${auth.userId}`
      );
      console.log(response);
      setUserPlaces(response.places);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [sendRequest]);

  const onDelete = (id) => {
    setUserPlaces((prev) => prev.filter((place) => place.id !== id));
  };

  return (
    <div>
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
      {isLoading ? (
        <h1 className="text-center text-4xl p-10 my-20">Loading...</h1>
      ) : (
        <PlaceList places={userPlaces} onDelete={onDelete} />
      )}
    </div>
  );
}
