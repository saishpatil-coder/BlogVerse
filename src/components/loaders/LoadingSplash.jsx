import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/Lottie Lego.json"; // place your .json file here

function LoadingSplash({
  appName = "BlogVerse",
  tagline = "Unleash your words",
  color = "text-orange-500"
}) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white animate-fade-in-out transition-all">
      <div className="border w-[300px] h-[300px]">
      <Lottie animationData={animationData} style={{ height: 300 }} loop={true} />
      </div>

      <h1 className={`text-3xl font-extrabold ${color} mb-2 tracking-wide`}>
        {appName}
      </h1>
      <p className="text-gray-500 text-sm italic">{tagline}</p>
    </div>
  );
}
export default LoadingSplash
