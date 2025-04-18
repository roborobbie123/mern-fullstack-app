import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "./UserPlaces";
import Input from "../components/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/validators";

export default function UpdatePlace() {
  const placeId = useParams().placeId;

  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!place) {
    return (
      <div>
        <h2>Could not find place.</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 flex justify-center bg-white px-2 py-5 rounded-sm w-[20rem] md:w-[30rem] shadow-sm">
      <form className="flex-col">
        <Input
          id="title"
          label="Title"
          type="text"
          validators={[VALIDATOR_MINLENGTH(), VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={() => {}}
          value={place.title}
          valid={true}
        />
        <Input
          id="description"
          label="Description"
          type="text"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(), VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description (min 5 characters)."
          onInput={() => {}}
          value={place.description}
          valid={true}
        />
        <button
          type="submit"
          className="border ml-2 py-1 px-5 text-center text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-md shadow-lg disabled:bg-gray-600 disabled:text-gray-400"
        >
          UPDATE PLACE
        </button>
      </form>
    </div>
  );
}
