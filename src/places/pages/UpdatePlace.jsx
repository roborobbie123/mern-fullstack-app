import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "./UserPlaces";
import Input from "../components/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/validators";
import { useForm } from "../../shared/form-hook";
import { useEffect, useState } from "react";

export default function UpdatePlace() {
  const [isLoading, setIsLoading] = useState(true);
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

  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  useEffect(() => {
    if (place) {
      setFormData(
        {
          title: {
            value: place?.title,
            isValid: true,
          },
          description: {
            value: place?.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, place]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!place) {
    return (
      <div>
        <h2>Could not find place.</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    formState.inputs.title.value && (
      <div className="mx-auto mt-10 flex justify-center bg-white px-2 py-5 rounded-sm w-[20rem] md:w-[30rem] shadow-sm">
        <form className="flex-col" onSubmit={placeUpdateSubmitHandler}>
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
      </div>
    )
  );
}
