import React from "react";
import { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import Modal from "../../shared/Modal";
import useHttpClient from "../../shared/http-hook";

// import RobertBarrett from "../../assets/RobertBarrett.jpeg";
// import lebron from "../../assets/lebron.png";
// import spongebob from "../../assets/spongebob.png";

// const USERS = [
//   { id: "u1", name: "Robert Barrett", image: RobertBarrett, placeCount: 5 },
//   { id: "u2", name: "Spongebob", image: spongebob, placeCount: 2 },
//   { id: "u3", name: "Lebron James", image: lebron, placeCount: 23 },
// ];

export default function Users() {
  const [userData, setUserData] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/api/users"
        );
        setUserData(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

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
        <UsersList items={userData} />
      )}
    </div>
  );
}
