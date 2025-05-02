import React from "react";
import { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import Modal from "../../shared/Modal";
import useHttpClient from "../../shared/http-hook";

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
