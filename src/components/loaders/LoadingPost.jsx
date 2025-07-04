import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/posts.json"; // place your .json file here

function LoadingPost({
  appName = "Loading Posts",
  tagline = "Unleash your words",
  color = "text-orange-500"
}) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white animate-fade-in-out transition-all">
      <div className="w-full ">
      <Lottie animationData={animationData} style={{ height: 800 }} loop={true} />
      </div>

      <h1 className={`text-3xl font-extrabold ${color} mb-2 tracking-wide`}>
        {appName}
      </h1>
      <p className="text-gray-500 text-sm italic">{tagline}</p>
    </div>
  );
}
export default LoadingPost
