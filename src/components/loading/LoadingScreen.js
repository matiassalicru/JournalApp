import React from "react";
import Lottie from "react-lottie";
import animationData from "../../styles/lotties/9965-loading-spinner.json";

export const LoadingScreen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className='loadingScreen'>
      <Lottie 
        options={defaultOptions} 
        height={400}
        width={400}
      />
    </div>
  );
};
