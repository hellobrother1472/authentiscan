"use client";

import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useState } from "react";
const Loader = () => (
  <div className="w-full flex justify-center h-1/3 items-center space-y-5">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
);

function dataURItoBlob(dataURI: string): Blob {
  const byteString = atob(dataURI.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: "audio/*" });
}

const page = () => {
  const [showResultDiv, setShowResultDiv] = useState(false);
  const [result, setResult] = useState(false);
  const [audioFile, setAudioFile] = useState<string>("");
  const [isLoader, setisLoader] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setisLoader(true);
      const formData = new FormData();
      formData.append("audio", dataURItoBlob(audioFile));
      console.log(formData);
      const response = await fetch(
        process.env.NEXT_PUBLIC_AUDIO_MODEL_API + "",
        {
          method: "POST",
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_TOKEN + "",
          },
          body: formData,
        }
      );
      if (response) {
        setisLoader(false);
        const result = await response.json();
        if (result[0].label === "bona-fide") {
          setResult(true);
        } else {
          setResult(false);
        }
        setShowResultDiv(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    setShowResultDiv(false);
    setAudioFile("");

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setAudioFile(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-screen bg-[#222831]">
      <h1 className="text-5xl text-white text-center pt-5 mb-10">
        Audio Detection
      </h1>

      <div className="h-1/4 text-white flex items-center flex-col space-y-5">
        <h1 className="text-2xl"> Enter Your Audio</h1>
        <form className="p-10 w-full flex justify-center">
          <input
            type="file"
            accept="audio/*"
            className="file-input file-input-bordered file-input-accent max-w-xs"
            size={6}
            onChange={handleChange}
          />
        </form>
      </div>

      {audioFile && (
        <div className="w-full flex justify-center space-x-5">
          <audio controls>
            <source src={audioFile} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <button onClick={handleSubmit} className="btn btn-accent">
            Submit
          </button>
        </div>
      )}

      {isLoader ? (
        <Loader />
      ) : (
        showResultDiv && (
          <div className="h-1/3 text-white flex items-center justify-center space-y-5">
            {result ? (
              <div className="text-green-500 text-5xl flex">
                <FaThumbsUp className="text-greeb-500 h-full mr-6" />
                Real
              </div>
            ) : (
              <div className="text-red-500 text-5xl flex">
                <FaThumbsDown className="text-red-500 h-full mr-6" />
                Fake
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default page;
