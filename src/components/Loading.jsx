import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <DotLottieReact
          src="https://lottie.host/8cca4e7d-f752-49f5-803f-a35ddca9ad2c/jKmlSezprx.lottie"
          loop
          autoplay
        />
      </div>{" "}
    </div>
  );
};

export default Loading;
