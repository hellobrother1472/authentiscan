"use client";

import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useState } from "react";
const page = () => {
	const [showResultDiv, setShowResultDiv] = useState(false);
	const [result, setResult] = useState(false);
	return (
		<div className="h-screen bg-[#222831]">
			<h1 className="text-5xl text-white text-center pt-5 mb-10">
				Image Detection
			</h1>

			<div className="h-1/3 text-white flex items-center flex-col space-y-5">
				<h1 className="text-2xl"> Enter Your Audio</h1>
				<form className="p-10">
					<input
						type="file"
						accept="image/*"
						className="file-input file-input-bordered file-input-primary w-full max-w-xs"
					/>
				</form>
			</div>

			{showResultDiv && (
				<div className="h-1/3 text-white flex items-center justify-center space-y-5">
					{result ? (
						<div className="text-green-500 text-6xl flex">
							<FaThumbsUp className="text-greeb-500 h-full mr-6" />
							Success
						</div>
					) : (
						<div className="text-red-500 text-6xl flex">
							<FaThumbsDown className="text-red-500 h-full mr-6" />
							Fake
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default page;
