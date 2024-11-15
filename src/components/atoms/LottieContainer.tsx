"use client";
import Lottie from "lottie-react";
import React from "react";

interface Props {
  animationData: object;
}

function LottieContainer({ animationData }: Props) {
  return <Lottie animationData={animationData} loop />;
}

export default LottieContainer;
