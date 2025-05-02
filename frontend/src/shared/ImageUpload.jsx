import { useState, useRef, useEffect } from "react";

export default function ImageUpload({ onInput, id, errorText }) {
  const [file, setFile] = useState();
  const [previewURL, setPreviewURL] = useState();
  const [isValid, setIsValid] = useState(null);

  const imageRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewURL(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    imageRef.current.click();
  };

  return (
    <div className="flex flex-col justify-center align-middle items-center">
      <input
        ref={imageRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        className="hidden"
      />
      <div className="flex flex-col justify-center items-center p-2">
        {previewURL && (
          <div className="rounded-2xl w-50 h-50 mb-10 overflow-hidden flex items-center justify-center">
            <img src={previewURL} alt="preview" />
          </div>
        )}
        {!previewURL && <p className="text-center p-10">Please pick an image.</p>}
        <button
          type="button"
          className="border ml-2 py-1 px-5 text-center text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-md shadow-lg disabled:bg-gray-600 disabled:text-gray-400 cursor-pointer"
          onClick={pickImageHandler}
        >
          PICK IMAGE
        </button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
}
