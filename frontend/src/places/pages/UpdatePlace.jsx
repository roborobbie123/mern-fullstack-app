import { useParams } from "react-router-dom";
import Input from "../components/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/validators";
import { useForm } from "../../shared/form-hook";
import { useEffect, useState, useContext } from "react";
import useHttpClient from "../../shared/http-hook";
import { AuthContext } from "../../shared/auth-context";
import Modal from "../../shared/Modal";
import { useNavigate } from "react-router-dom";

export default function UpdatePlace() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:4000/api/places/${placeId}`

        );
        setLoadedPlace(response.place);
        setFormData({
          title: {
            value: response.place.title,
            isValid: true,
          },
          description: {
            value: response.place.description,
            isValid: true,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const sendUpdate = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:4000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { "Content-Type": "application/json",
          Authorization: 'Bearer ' + auth.token
         }
      );
      console.log("Token: " + auth.token)
      navigate("/" + auth.userId + "/places");
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 flex justify-center bg-white px-2 py-5 rounded-sm w-[20rem] md:w-[30rem] shadow-sm">
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
      {!isLoading && loadedPlace && (
        <form className="flex-col" onSubmit={sendUpdate}>
          <Input
            id="title"
            label="Title"
            type="text"
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            valid={formState.inputs.title.isValid}
          />
          <Input
            id="description"
            label="Description"
            type="text"
            element="textarea"
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid description (min 5 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            valid={formState.inputs.description.isValid}
          />
          <button
            disabled={!formState.isValid}
            type="submit"
            className="border ml-2 py-1 px-5 text-center text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-md shadow-lg disabled:bg-gray-600 disabled:text-gray-400"
          >
            UPDATE PLACE
          </button>
        </form>
      )}
    </div>
  );
}
