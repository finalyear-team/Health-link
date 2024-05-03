"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

const UnderConstruction = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const timerID = setInterval(() => {
      const date = new Date();
      setCurrentTime(
        `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
      );
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-dark-700 ">
      <Image src="Under construction-amico.svg" alt="Under Construction" width={400} height={400} />
      <div className="text-4xl md:text-6xl font-bold font-main mb-4 dark:text-white">
        This page is under construction
      </div>
      <div className="text-6xl font-main md:text-2xl mb-8 dark:text-white">{currentTime}</div>
    </div>
  );
};

export default UnderConstruction;
