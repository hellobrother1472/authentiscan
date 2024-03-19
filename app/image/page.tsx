"use client";

import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

const Loader = () => (
	<div className="w-full flex justify-center h-1/3 items-center space-y-5">
		<span className="loading loading-spinner loading-lg"></span>
	</div>
);

const page = () => {
	const [showResultDiv, setShowResultDiv] = useState(false);
	const [result, setResult] = useState(false);
	const [imageFile, setImageFile] = useState<string>("");
	const [isLoader, setisLoader] = useState(false);
	const [imgData, setImgData] = useState('')

	const handleChange = (event: any) => {
		setShowResultDiv(false);
		const file = event.target.files[0]; // Get the selected file
		const reader = new FileReader(); // Create a FileReader instance
	
		reader.onloadend = () => {
			// Set imgData to the base64 data URL of the selected image
			setImgData(reader.result as string); 
		};
	
		if (file) {
			reader.readAsDataURL(file); // Read the file as a data URL
			setImageFile(URL.createObjectURL(file)); // Set the imageFile for preview
		}
	};
	
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setisLoader(true);
			const formData = new FormData();
			formData.append('image', imgData); // Append the base64 data URL to FormData
	
			const response = await fetch(
				"https://api-inference.huggingface.co/models/dima806/deepfake_vs_real_image_detection",
				{
					method: "POST",
					headers: {
						"Authorization": "Bearer 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",
						"Content-type": "multipart/form-data",
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
	

	return (
		<div className="h-screen bg-[#222831]">
			<h1 className="text-5xl text-white text-center pt-5 mb-10">
				Image Detection
			</h1>

			<div className="h-1/4 text-white flex items-center flex-col space-y-5">
				<h1 className="text-2xl"> Enter Your Image</h1>
				<form className="p-10">
					<input
						type="file"
						accept="image/*"
						className="file-input file-input-bordered file-input-primary w-full max-w-xs"
						onChange={handleChange}
					/>
				</form>
			</div>

			{imageFile && (
				<div className="w-full flex justify-center space-x-10 items-center">
					<Image
						src={imageFile}
						alt="img"
						width={200}
						height={200}
						style={{
							width: "200px",
							height: "auto",
						}}
					/>
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
