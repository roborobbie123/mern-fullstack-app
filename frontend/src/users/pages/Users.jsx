import React from "react";
import { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import Modal from "../../shared/Modal";

import RobertBarrett from "../../assets/RobertBarrett.jpeg";
import lebron from "../../assets/lebron.png";
import spongebob from "../../assets/spongebob.png";

export default function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);

  const USERS = [
    { id: "u1", name: "Robert Barrett", image: RobertBarrett, placeCount: 5 },
    { id: "u2", name: "Spongebob", image: spongebob, placeCount: 2 },
    { id: "u3", name: "Lebron James", image: lebron, placeCount: 23 },
  ];

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:4000/api/users");

        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.message);
        }
        setUserData(resData.users);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
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
                onClick={handleError}
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
        <UsersList items={userData} />
      )}
    </div>
  );
}
