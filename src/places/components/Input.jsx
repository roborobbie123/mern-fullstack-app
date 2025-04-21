import React, { useReducer, useEffect } from "react";
import { validate } from "../../shared/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

export default function Input({ ...props }) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.valid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const handleChange = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const inputStyles =
    "bg-gray-100 hover:bg-gray-200 border-gray-400 hover:border-gray-700 border mb-1 rounded-sm";

  const handleTouch = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        className={inputStyles}
        onChange={handleChange}
        onBlur={handleTouch}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        className={inputStyles}
        onChange={handleChange}
        onBlur={handleTouch}
        value={inputState.value}
      />
    );

  const invalidStyle = "text-red-500 border-red-500";

  return (
    <div
      className={`bg-white text-black flex flex-col gap-1 px-2 py-5 rounded-sm w-[20rem] md:w-[30rem] mt-2 ${
        !inputState.isValid && inputState.isTouched && invalidStyle
      }`}
    >
      <label className='font-semibold' htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}
