import { useForm } from "../../shared/form-hook";
import { useState } from "react";
import Input from "../../places/components/Input";
import Modal from "../../shared/Modal";
import ImageUpload from "../../shared/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/validators";
import { AuthContext } from "../../shared/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useHttpClient from "../../shared/http-hook";

export default function Auth() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [authPage, setAuthPage] = useState("login");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
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

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (authPage === "login") {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(responseData)
        auth.login(responseData.user.id);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else if (authPage === "signup") {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          "http://localhost:4000/api/users/signup",
          "POST",
          formData
        );
        auth.set;
        auth.login(responseData.user.id);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (authPage === "login") {
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

        <div className="mx-auto mt-10 flex flex-col justify-center bg-white py-5 rounded-sm w-[20rem] md:w-[30rem] shadow-sm">
          {isLoading ? (
            <h1 className="text-center text-4xl p-10 my-20">Loading...</h1>
          ) : (
            <>
              <h2 className="px-2 font-semibold text-lg">Login Required</h2>
              <form onSubmit={authSubmitHandler}>
                <Input
                  id="email"
                  element="input"
                  type="email"
                  label="Email"
                  errorText="Please enter a valid email."
                  validators={[VALIDATOR_EMAIL()]}
                  onInput={inputHandler}
                  placeholder=""
                />
                <Input
                  id="password"
                  element="input"
                  type="password"
                  label="Password"
                  errorText="Password must be at least 6 characters."
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  onInput={inputHandler}
                  placeholder=""
                />
                <button
                  type="submit"
                  disabled={!formState.isValid}
                  className="border ml-2 py-1 px-5 text-center text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-md shadow-lg disabled:bg-gray-600 disabled:text-gray-400 cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => setAuthPage("signup")}
                  className="border ml-2 py-1 px-5 text-center text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-md shadow-lg disabled:bg-gray-600 disabled:text-gray-400 cursor-pointer"
                >
                  SWITCH TO SIGN UP
                </button>
              </form>
            </>
          )}
        </div>
      </>
    );
  } else if (authPage === "signup") {
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
        <div className="mx-auto mt-10 flex flex-col justify-center bg-white py-5 rounded-sm w-[20rem] md:w-[30rem] shadow-sm">
          {isLoading ? (
            <h1 className="text-center text-4xl p-10 my-20">Loading...</h1>
          ) : (
            <>
              <h2 className="px-2 font-semibold text-lg">Sign Up</h2>
              <form onSubmit={authSubmitHandler}>
                <Input
                  id="name"
                  element="input"
                  type="text"
                  label="Your Name"
                  errorText="Please enter a name."
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  placeholder=""
                />
                <ImageUpload
                  id="image"
                  onInput={inputHandler}
                  errorText="Please provide a compatible image"
                />
                <Input
                  id="email"
                  element="input"
                  type="email"
                  label="Email"
                  errorText="Please enter a valid email."
                  validators={[VALIDATOR_EMAIL()]}
                  onInput={inputHandler}
                  placeholder=""
                />
                <Input
                  id="password"
                  element="input"
                  type="password"
                  label="Password"
                  errorText="Password must be at least 6 characters."
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  onInput={inputHandler}
                  placeholder=""
                />

                <button
                  type="submit"
                  disabled={!formState.isValid}
                  className="border ml-2 py-1 px-5 text-center text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-md shadow-lg disabled:bg-gray-600 disabled:text-gray-400 cursor-pointer"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setAuthPage("login")}
                  className="border ml-2 py-1 px-5 text-center text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-md shadow-lg disabled:bg-gray-600 disabled:text-gray-400 cursor-pointer"
                >
                  SWITCH TO LOGIN
                </button>
              </form>
            </>
          )}
        </div>
      </>
    );
  }
}
