import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import useHttpClient from "../../shared/http-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/validators";
import { useForm } from "../../shared/form-hook";
import { AuthContext } from "../../shared/auth-context";
import Modal from "../../shared/Modal";
import ImageUpload from "../../shared/ImageUpload";

export default function NewPlace() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const navigate = useNavigate();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value),
        formData.append("description", formState.inputs.description.value),
        formData.append("address", formState.inputs.address.value),
        formData.append("creator", auth.userId),
        formData.append("image", formState.inputs.image.value),
        await sendRequest("http://localhost:4000/api/places", "POST", formData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

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
      <form onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide a compatible image"
        />
        <Input
          id="description"
          label="Description"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          label="Address"
          element="input"
          validators={[VALIDATOR_REQUIRE]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <button
          type="submit"
          disabled={!formState.isValid}
          className="border ml-2 py-1 px-5 text-center text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-md shadow-lg disabled:bg-gray-600 disabled:text-gray-400"
        >
          ADD PLACE
        </button>
      </form>
    </div>
  );
}
