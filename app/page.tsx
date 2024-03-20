import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <div className="bg-[#222831] h-screen">
      <h1 className="text-center text-6xl p-10 uppercase text-white font-semibold">
        authentiscan
      </h1>
      <div className="flex space-x-10 justify-center items-center h-1/2 mt-10">
        <Link
          href="/audio"
          className="w-3/12 h-1/2 rounded-lg flex items-center hover:shadow-md cursor-pointer hover:shadow-green-200 bg-accent"
        >
          <h1 className="text-center w-full text-xl text-white">
            Audio Detection
          </h1>
        </Link>
        <Link
          href="/image"
          className="bg-primary w-3/12 h-1/2 rounded-lg flex items-center hover:shadow-md cursor-pointer hover:shadow-blue-200"
        >
          <h1 className="text-center w-full text-white text-xl">
            Image Detection
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default page;
