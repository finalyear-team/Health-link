"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

const UnderConstruction = () => {

  return (
    <div className="custome-under-construction">
      <div>
        <Image
          src="/image/Under construction-amico.svg"
          alt="Under Construction"
          width={400}
          height={400}
          priority
          // className="auto"
        />
      </div>
      <div>
        <div className="custome-under-construction-title">
          This page is under construction
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
