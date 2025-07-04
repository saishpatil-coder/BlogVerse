import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/LOADING.json"; // place your .json file here

function Loading(
    prop
) {
    console.log(prop)
    let {appName,color ,tagline} = prop.props
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white animate-fade-in-out transition-all">
      <div className="w-full h-auto">
      <Lottie animationData={animationData} style={{ height: 300 }} loop={true} />
      </div>

      <h1 className={`text-3xl font-extrabold ${color?color:""} mb-2 tracking-wide`}>
        {appName}
      </h1>
      {tagline&&      <p className="text-gray-500 text-sm italic">{tagline}</p>
    }
    </div>
  );
}
export default Loading
