"use client";

import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useState } from "react";
const page = () => {
	const [showResultDiv, setShowResultDiv] = useState(true);
	const [result, setResult] = useState(false);
	return (
		<div className="h-screen bg-[#222831]">
			<h1 className="text-5xl text-white text-center pt-5 mb-10">
				Audio Detection
			</h1>

			<div className="h-1/3 text-white flex items-center flex-col space-y-5">
				<h1 className="text-2xl"> Enter Your Audio</h1>
				<form className="p-10 w-full flex justify-center">
					<input
						type="file"
						accept="audio/*"
						className="file-input file-input-bordered file-input-accent max-w-xs"
                        size={6}
					/>
				</form>
			</div>

			{showResultDiv && (
				<div className="h-1/3 text-white flex items-center justify-center space-y-5">
					{result ? (
						<div className="text-green-500 text-5xl flex">
							<FaThumbsUp className="text-greeb-500 h-full mr-6" />
							Success
						</div>
					) : (
						<div className="text-red-500 text-5xl flex">
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
